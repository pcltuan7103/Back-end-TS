import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { PhoneModule } from './modules/phone/phone.module';
import { ServiceService } from './modules/role/service.service';
import { ControllerController } from './modules/role/controller.controller';
import { RoleModule } from './modules/role/role.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI as string),
        UserModule,
        AuthModule,
        PhoneModule,
        RoleModule,
    ],
    controllers: [AppController, ControllerController],
    providers: [AppService, ServiceService],
})

export class AppModule {}
