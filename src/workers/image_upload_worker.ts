// src/profile/image-upload.worker.ts
import { UploadService } from 'src/cloudinary/cloudinary.service';
import { parentPort, workerData } from 'worker_threads';

async function ImageUploadWorker() {
    try {
        const uploadService = new UploadService();
        const profileImage = await uploadService.uploadToCloudinary(workerData.file);
        parentPort?.postMessage({ success: true, profileImage });
    } catch (error) {
        parentPort?.postMessage({
            success: false,
            error: error.message,
            userId: workerData.userId,
            profileId: workerData.profileId
        });
    }
}

ImageUploadWorker();