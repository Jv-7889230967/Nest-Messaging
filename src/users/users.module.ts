import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users.model';
import { UserService } from './users.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [
    SequelizeModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule], // Required for injecting ConfigService
      inject: [ConfigService],
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60s' },
      }),
    }),
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule { }
