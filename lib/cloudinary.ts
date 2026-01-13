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

export { cloudinary };
