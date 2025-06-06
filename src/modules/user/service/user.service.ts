import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../model/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async getAllUsers() {
        const users = await this.userModel.find().sort({ user_id: 1 }).lean();
        return users.map(({ password, ...rest }) => rest);
    }

    async getUserById(user_id: number) {
        const user = await this.userModel
            .findOne({ user_id })
            .select("-password")
            .exec();

        if (!user) throw new NotFoundException(`Không tìm thấy người dùng`);

        return user;
    }
}
