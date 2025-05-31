import { HttpException, Injectable } from "@nestjs/common";
import { Profile } from "./profile.model";
import { InjectModel } from "@nestjs/sequelize";
import * as path from 'path';
import { Worker } from "worker_threads";

@Injectable()
export class ProfileService {
    constructor(@InjectModel(Profile) private profileModel: typeof Profile) { }

    async createProfile(name: string, activeUser: number, file: Express.Multer.File | null) {
        try {
            const profileExisted = await this.profileModel.findOne({ where: { owner: activeUser } });
            if (profileExisted) {
                throw new HttpException("Profile already exists for this user", 400);
            }


            const createdProfile = await this.profileModel.create({
                owner: activeUser,
                profile_name: name,
                image_url: null,
            })

            if (file) {
                this.uploadImage(file, createdProfile?.id);
            }
            
            return createdProfile;
        } catch (error: any) {
            throw new HttpException(error?.message || "Internal Server Error", error?.status || 500);
        }
    }

    private uploadImage(file: Express.Multer.File | null, profileId: number | undefined): void {
        const workerPath = path.resolve(__dirname, '../workers/image_upload_worker.js');

        const imageWorker = new Worker(workerPath, {
            workerData: { file }
        })

        imageWorker.on("message", async (message) => {
            if (message.success) {
                await this.profileModel.update(
                    { image_url: message.profileImage },
                    { where: { id: profileId } }
                )
            }
        })
        imageWorker.on('error', (error) => {
            console.error('Worker error:', error);
        });
    }
}