import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI as string),
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})

export class AppModule {}
