import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/users.model';
import { ConfigModule } from '@nestjs/config';
import { ChatGateway } from './chats/chats.gateway';
import { ProfileModule } from './profile/profile.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'vermas@123',
      database: 'Messaging-App',
      models: [User],
      autoLoadModels: true,
      synchronize: true,
    }), UsersModule, ProfileModule
  ],
  controllers: [AppController],
  providers: [AppService, ChatGateway],
})
export class AppModule { }
