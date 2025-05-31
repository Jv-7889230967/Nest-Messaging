import { Injectable, CanActivate, ExecutionContext, HttpException, UnauthorizedException } from '@nestjs/common';
import { ValidateRequest } from 'src/utility/ValidateToken';


@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private validateRequest: ValidateRequest) { }
    async canActivate(
        context: ExecutionContext,
    ): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const access_token: string | undefined | null = request?.headers?.authorization?.split(" ")[1];
        if (!access_token) {
            throw new UnauthorizedException({
                message: 'Access token missing',
                errorCode: 'TOKEN_MISSING',
            });
        }
        const userValidated: boolean = await this.validateRequest.validateToken(access_token, request);
        if (!userValidated) {
            throw new HttpException("User unAuthorized", 401);
        }
        return true;
    }
}
