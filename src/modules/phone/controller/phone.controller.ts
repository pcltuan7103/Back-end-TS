import {
    Body,
    Controller,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Delete,
} from "@nestjs/common";
import { PhoneService } from "../service/phone.service";

@Controller("phone")
export class PhoneController {
    constructor(private readonly phoneService: PhoneService) {}

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

    @Put(":id")
    updatePhone(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
        return this.phoneService.updatePhone(id, body);
    }

    @Delete(":id")
    softDeletePhone(@Param("id", ParseIntPipe) id: number) {
        return this.phoneService.softDeletePhone(id);
    }
}
