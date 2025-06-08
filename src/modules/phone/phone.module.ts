import { Module } from "@nestjs/common";
import { PhoneController } from "./controller/phone.controller";
import { PhoneService } from "./service/phone.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Phone, PhoneSchema } from "./model/phone.model";
import { CloudinaryService } from "src/services/cloudinary.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Phone.name, schema: PhoneSchema }]),
        JwtModule.register({}),
    ],
    controllers: [PhoneController],
    providers: [PhoneService, CloudinaryService],
})
export class PhoneModule {}
