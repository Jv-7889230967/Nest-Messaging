import { Body, Controller, HttpCode, Post, Request, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthGuard } from "src/authentication/auth.guard";
import { ProfileService } from "./profile.service";
import { FileInterceptor } from "@nestjs/platform-express";


@Controller("profile")
@UseGuards(AuthGuard)
export class profileController {
    constructor(private readonly profileService: ProfileService) { }

    @Post("/create-profile")
    @HttpCode(201)
    @UseInterceptors(FileInterceptor('profile-image'))
    async createProfile(@Body() body: { name: string, image: string }, @Request() request: any, @UploadedFile() file: Express.Multer.File) {
        const activeUser: number = request.activeUser;
        const { name } = body;
        const profile = await this.profileService.createProfile(name, activeUser, file);

        return {
            message: "Your profile has been created successfully",
            user_profile: profile
        }
    }
}                           