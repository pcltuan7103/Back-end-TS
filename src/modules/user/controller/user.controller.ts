// src/modules/user/controller/user.controller.ts
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put } from "@nestjs/common";
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

    @Put(":id")
    updateUser(@Param("id", ParseIntPipe) id: number, @Body() body: any) {
        return this.userService.updateUser(id, body);
    }

    @Delete(":id")
    deleteUser(@Param("id", ParseIntPipe) id: number) {
        return this.userService.deleteUser(id);
    }
}
