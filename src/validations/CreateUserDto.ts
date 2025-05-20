import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Name should not be empty' })
    @MinLength(4, { message: 'Name must be at least 4 characters long' })
    @IsString({ message: 'Name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'Email is required' })
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(5, { message: 'Password must be at least 5 characters long' })
    @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).+$/, {
        message: 'Password must contain at least one uppercase letter and one special character',
    })
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty({ message: 'Email is required' })
    email: string;

    @IsNotEmpty({ message: 'Password is required' })
    password: string;
}
