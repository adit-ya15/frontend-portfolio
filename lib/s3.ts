import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// Normalise endpoint and choose region compatible with S3-compatible providers
const RAW_ENDPOINT = process.env.AWS_S3_ENDPOINT?.trim();
const NORMALISED_ENDPOINT = RAW_ENDPOINT
  ? RAW_ENDPOINT.replace(/\/$/, "") // remove single trailing slash
  : undefined;

// If using a custom S3-compatible endpoint (e.g. Tebi, R2), prefer "auto" region
const USING_CUSTOM_ENDPOINT = Boolean(NORMALISED_ENDPOINT) && !NORMALISED_ENDPOINT!.includes("amazonaws.com");
const EFFECTIVE_REGION = USING_CUSTOM_ENDPOINT ? (process.env.AWS_REGION || "auto") : process.env.AWS_REGION!;

const s3Client = new S3Client({
  region: EFFECTIVE_REGION || "auto",
  endpoint: NORMALISED_ENDPOINT, // Tebi / custom S3 endpoint
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
  // Path-style is broadly compatible across non-AWS providers
  forcePathStyle: true,
});

const BUCKET_NAME = process.env.AWS_BUCKET_NAME!;

export async function uploadToS3(
  file: Buffer | Uint8Array | string,
  key: string,
  contentType: string = "application/octet-stream"
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: file,
    ContentType: contentType,
  });

  await s3Client.send(command);
  
  // Return the correct URL based on endpoint
  if (NORMALISED_ENDPOINT) {
    // For Tebi.io or custom S3 endpoints
    return `${NORMALISED_ENDPOINT}/${BUCKET_NAME}/${key}`;
  }
  
  // For standard AWS S3
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

export async function getSignedS3Url(key: string, expiresIn: number = 3600): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });

  const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });
  return signedUrl;
}

export function getPublicS3Url(key: string): string {
  // Return the correct URL based on endpoint
  if (NORMALISED_ENDPOINT) {
    // For Tebi.io or custom S3 endpoints
    return `${NORMALISED_ENDPOINT}/${BUCKET_NAME}/${key}`;
  }
  
  // For standard AWS S3
  return `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}

// Helper to extract S3 key from URL
export function extractS3Key(url: string): string | null {
  if (!url) return null;
  
  // Check if it's an S3 URL
  // Capture path up to any query string
  const s3Pattern = new RegExp(`${BUCKET_NAME}/([^?]+)`);
  const match = url.match(s3Pattern);
  
  return match ? match[1] : null;
}

// Helper to convert S3 URL to signed URL
export async function convertToSignedUrl(url: string, expiresIn: number = 3600): Promise<string> {
  // If empty or already a full HTTP URL that's not our S3, return as is
  if (!url) return url;
  
  // If it's already a signed URL (contains signature), return as is
  if (url.includes('X-Amz-Signature') || url.includes('Signature=')) return url;
  
  // If it's an external HTTP URL (not from our bucket), return as is
  if (url.startsWith('http') && !url.includes(BUCKET_NAME)) return url;
  
  // Extract the S3 key from the URL or path
  let key: string | null = null;
  
  if (url.startsWith('http')) {
    // It's a full URL, extract the key
    key = extractS3Key(url);
  } else {
    // It's already just a key/path (like "services/icon.png")
    key = url;
  }
  
  if (!key) return url;
  
  try {
    const signedUrl = await getSignedS3Url(key, expiresIn);
    return signedUrl;
  } catch (error) {
    console.error('Error generating signed URL for key:', key, error);
    return url; // Return original if signing fails
  }
}

export { s3Client };
