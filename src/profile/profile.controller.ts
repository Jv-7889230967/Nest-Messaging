import { Controller, Post } from "@nestjs/common";


@Controller("profile")
export class profileController {

    @Post("/create-profile")
    async createProfile() {
        
    }
}