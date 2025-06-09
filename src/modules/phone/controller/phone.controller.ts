import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { PhoneService } from "../service/phone.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { CloudinaryService } from "src/services/cloudinary.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { ActionPhoneParams } from "../types/phone.types";

@Controller("phone")
export class PhoneController {
    constructor(
        private readonly phoneService: PhoneService,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Post()
    @UseInterceptors(FileInterceptor("image"))
    async createPhone(
        @UploadedFile() file: Express.Multer.File,
        @Body() body: ActionPhoneParams,
    ) {
        const uploadRes = await this.cloudinaryService.uploadImage(file);
        return this.phoneService.createPhone({
            ...body,
            image_url: uploadRes.secure_url,
        });
    }

    @Get()
    getAllPhones() {
        return this.phoneService.getAllPhones();
    }

    @Get(":id")
    getPhoneById(@Param("id", ParseIntPipe) id: number) {
        return this.phoneService.getPhoneById(id);
    }

    @Put(":id")
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @UseInterceptors(FileInterceptor("image"))
    async updatePhone(
        @Param("id", ParseIntPipe) id: number,
        @UploadedFile() file: Express.Multer.File,
        @Body() body: ActionPhoneParams,
    ) {
        let image_url = body.image_url;

        if (file) {
            const oldPhone = await this.phoneService.getPhoneById(id);

            if (oldPhone.image_url) {
                const segments = oldPhone.image_url.split("/");
                const publicIdWithExt = segments[segments.length - 1];
                const publicId = `phones/${publicIdWithExt.split(".")[0]}`;
                await this.cloudinaryService.deleteImage(publicId);
            }

            const uploadRes = await this.cloudinaryService.uploadImage(file);
            image_url = uploadRes.secure_url;
        }

        return this.phoneService.updatePhone(id, {
            ...body,
            image_url,
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Delete(":id")
    softDeletePhone(@Param("id", ParseIntPipe) id: number) {
        return this.phoneService.softDeletePhone(id);
    }
}
