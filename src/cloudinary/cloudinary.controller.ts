import { Controller, Post } from "@nestjs/common";
import { UploadService } from "./cloudinary.service";


@Controller("upload")
export class CloudUpload {
    constructor(private readonly fileUpload: UploadService) { }
    @Post("image")
    async uploadImage(imageFile: Express.Multer.File) {
        try {
            const fileUploaded = await this.fileUpload.uploadToCloudinary(imageFile);
            return {
                message: "file uploaded successfully",
                assetUrl: fileUploaded,
            }
        } catch (error) {
            return {
                message: "file upload failed",
                error: error.message,
            }
        }
    }
}