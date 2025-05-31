import { Injectable } from '@nestjs/common';
import { UploadApiResponse } from 'cloudinary';
import { v2 as cloudinary } from 'cloudinary';


@Injectable()
export class UploadService {
    async uploadToCloudinary(file: Express.Multer.File): Promise<string | null> {

        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_URL,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
        if (!file) {
            throw new Error("File URL is undefined or empty.");
        }
        const uploadResult = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload_stream((error, uploadResult) => {
                if (error || !uploadResult) {
                    return reject(error || new Error("Upload failed, no result returned."));
                }
                return resolve(uploadResult);
            }).end(file.buffer);
        });
        const imageUrl: string | null = cloudinary.url(uploadResult?.public_id, {
            transformation: [
                {
                    quality: "auto",
                    fetch_format: "auto",
                },
                {
                    width: 1200,
                    height: 1200,
                }
            ]
        });
        return imageUrl;
    }
}
