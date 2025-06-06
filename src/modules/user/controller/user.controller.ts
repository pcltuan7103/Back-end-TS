// src/modules/user/controller/user.controller.ts
import {
    Controller,
    Get,
    Param,
    ParseIntPipe,
} from "@nestjs/common";
import { UserService } from "../service/user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param("id", ParseIntPipe) id: number) {
        return this.userService.getUserById(id);
    }
}
