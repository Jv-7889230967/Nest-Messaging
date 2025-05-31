import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Profile } from './profile.model';
import { profileController } from './profile.controller';
import { AuthModule } from 'src/authentication/auth.module';
import { ProfileService } from './profile.service';
import { UploadService } from 'src/cloudinary/cloudinary.service';

@Module({
    imports: [
        SequelizeModule.forFeature([Profile]),
        AuthModule
    ],
    controllers: [profileController],
    providers: [ProfileService, UploadService]
    // providers: [
    //     {
    //         provide: APP_GUARD,
    //         useClass: AuthGuard,
    //     },
    // ],
})
export class ProfileModule { }
