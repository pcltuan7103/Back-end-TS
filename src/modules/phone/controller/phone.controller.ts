import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    UseGuards,
} from "@nestjs/common";
import { PhoneService } from "../service/phone.service";
import { JwtAuthGuard } from "src/guards/jwt-auth.guard";
import { RolesGuard } from "src/guards/roles.guard";
import { Roles } from "src/decorators/roles.decorator";

@Controller("phone")
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Post()
    createPhone(@Body() body: any) {
        return this.phoneService.createPhone(body);
    }

    @Get()
    getAllPhones() {
        return this.phoneService.getAllPhones();
    }

    @Get(":id")
    getPhoneById(@Param("id", ParseIntPipe) id: number) {
        return this.phoneService.getPhoneById(id);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Put(":id")
    updatePhone(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
        return this.phoneService.updatePhone(id, body);
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles("Admin")
    @Delete(":id")
    softDeletePhone(@Param("id", ParseIntPipe) id: number) {
        return this.phoneService.softDeletePhone(id);
    }
}
