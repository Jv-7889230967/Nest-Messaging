import { HttpException, Injectable } from '@nestjs/common';
import { logginedUserType, userType } from './users.interface';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
    constructor(@InjectModel(User) private userModel: typeof User, private jwtService: JwtService) { };

    async registerUser(userDetails: userType): Promise<User> {
        try {
            const { name, email, password } = userDetails;
            const userExist = await this.userModel.findOne({ where: { email: email } });
            if (userExist) {
                throw new HttpException("user already exist", 409);
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const refresh_token: string = await this.jwtService.signAsync({
                email: email,
                name: name,
                password: hashedPassword
            }, { expiresIn: '7d' });

            const registerUser = await this.userModel.create({
                name: name,
                email: email,
                password: hashedPassword,
                refresh_token: refresh_token,
            });
            return registerUser;
        } catch (error: any) {
            throw new HttpException(error?.message || "Internal Server Error", error?.status || 500);
        }
    }

    async loginUser(userDetails: userType): Promise<logginedUserType> {
        try {
            const { email, password } = userDetails;
            const user = await this.userModel.findOne({
                where: { email: email },
                attributes: { include: ['user_id', 'name', 'email', 'password'] }
            });
            if (!user) {
                throw new HttpException("user not found", 404);
            }
            const loggedinUserValues: userType | null = user?.dataValues;
            const isPasswordValid = await bcrypt.compare(password, loggedinUserValues?.password);
            if (!isPasswordValid) {
                throw new HttpException("Incorrect Password", 401);
            }
            const access_token = await this.jwtService.signAsync(
                { user_id: loggedinUserValues?.user_id },
                {
                    expiresIn: "4d"
                })

            return {
                name: loggedinUserValues?.name,
                email: loggedinUserValues?.email,
                access_token: access_token
            };
        } catch (error) {
            throw new HttpException(error?.message || "Internal Server Error", error?.status || 500);
        }
    }
}
