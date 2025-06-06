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

    async updateUser(user_id: number, updateData: Partial<User>) {
        const updated = await this.userModel
            .findOneAndUpdate(
                { user_id },
                { ...updateData, updateAt: new Date() },
                { new: true },
            )
            .select("-password");

        if (!updated) throw new NotFoundException(`Không tìm thấy người dùng`);
        return {
            message: `Đã cập nhật người dùng thành công`,
            user: {
                user_id: updated.user_id,
            },
        };
    }

    // DELETE user by user_id
    async deleteUser(user_id: number) {
        const deleted = await this.userModel
            .findOneAndDelete({ user_id })
            .select("-password");
        if (!deleted) throw new NotFoundException(`Không tìm thấy người dùng`);
        return {
            message: `Đã xóa người dùng thành công`,
            user: {
                user_id: deleted.user_id,
            },
        };
    }
}
