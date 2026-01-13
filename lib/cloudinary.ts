import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

export async function uploadToCloudinary(
    file: Buffer | string,
    folder: string = 'portfolio',
    resourceType: 'auto' | 'image' | 'video' | 'raw' = 'auto'
): Promise<{ url: string; publicId: string }> {
    return new Promise((resolve, reject) => {
        // If it's a base64 string or URL
        if (typeof file === 'string') {
            cloudinary.uploader.upload(
                file,
                {
                    folder,
                    resource_type: resourceType,
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve({
                        url: result!.secure_url,
                        publicId: result!.public_id,
                    });
                }
            );
            return;
        }

        // If it's a buffer
        const uploadStream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: resourceType,
            },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    url: result!.secure_url,
                    publicId: result!.public_id,
                });
            }
        );

        uploadStream.end(file);
    });
}

// Helper to keep compatibility with existing code that expects signed URLs
// Cloudinary default URLs are public, but we can add transformation or signature if needed later.
// For now, it just returns the URL as-is since Cloudinary URLs are usually permanent.
export async function convertToSignedUrl(url: string, expiresIn: number = 3600): Promise<string> {
    if (!url) return url;
    // If it's already a Cloudinary URL, return as is
    if (url.includes('cloudinary.com')) return url;

    // If it was an old S3 URL, we might want to return it as is or handle migration
    // For this tasks scope, we assume new uploads or existing public URLs
    return url;
}

// Helper to extract public ID from Cloudinary URL
export function extractPublicIdFromUrl(url: string): string | null {
    if (!url || !url.includes('cloudinary.com')) return null;

    // Cloudinary URLs format: .../upload/v1234567890/folder/filename.ext
    // We need 'folder/filename' (without extension)

    try {
        const parts = url.split('/upload/');
        if (parts.length < 2) return null;

        const pathAfterUpload = parts[1];
        // Skip version if present (starts with v and numbers)
        const pathParts = pathAfterUpload.split('/');

        // Find where the actual path starts (after version)
        let startIndex = 0;
        if (pathParts[0].startsWith('v') && !isNaN(Number(pathParts[0].substring(1)))) {
            startIndex = 1;
        }

        const publicIdWithExt = pathParts.slice(startIndex).join('/');
        // Remove file extension
        const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf('.'));

        return publicId;
    } catch (error) {
        console.error('Error extracting public ID:', error);
        return null;
    }
}

export async function deleteFromCloudinary(publicId: string): Promise<boolean> {
    if (!publicId) return false;

    return new Promise((resolve) => {
        cloudinary.uploader.destroy(publicId, (error, result) => {
            if (error) {
                console.error('Cloudinary delete error:', error);
                resolve(false);
                return;
            }
            console.log('Cloudinary delete result:', result);
            resolve(result.result === 'ok');
        });
    });
}

export { cloudinary };
