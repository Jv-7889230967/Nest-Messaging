import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class ValidateRequest {
    constructor(private jwtServcie: JwtService) { }
    async validateToken(access_token: string, request: any): Promise<boolean> {
        const userId: { user_id: number | null } = await this.jwtServcie?.verifyAsync(access_token);
        if (userId) {
            request.activeUser = userId?.user_id;
            return true;
        }
        return false;
    }
}