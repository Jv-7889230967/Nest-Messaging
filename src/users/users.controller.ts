import { Body, Controller, HttpCode, HttpException, Post } from "@nestjs/common";
import { UserService } from "./users.service";
import { User } from "./users.model";
import { CreateUserDto, LoginUserDto } from "src/validations/CreateUserDto";


@Controller("users")
export class UsersController {
    constructor(private readonly userService: UserService) { };

    @Post("/register-user")
    @HttpCode(201)
    async registerUser(@Body() createUserDto: CreateUserDto): Promise<{ message: string, result?: User }> {
        try {
            const { name, email, password } = createUserDto;

            const registeredUser = await this.userService.registerUser({
                name: name,
                email: email,
                password: password
            });

            return {
                message: "user registered successfully",
                result: registeredUser,
            }
        } catch (error) {
            throw new HttpException(error?.message || "Internal Server Error", error?.status || 500);
        }
    }

    @Post("/login-user")
    @HttpCode(200)
    async loginUser(@Body() body: LoginUserDto): Promise<any> {
        try {
            const user = await this.userService.loginUser(body);
            return {
                status: 200,
                message: "user logged in successfully",
                result: user
            }
        } catch (error) {
            throw new HttpException(error?.message || "Internal Server Error", error?.status || 500);
        }
    }
}