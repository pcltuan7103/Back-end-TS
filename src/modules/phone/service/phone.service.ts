// phone.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Phone } from "../model/phone.model";

@Injectable()
export class PhoneService {
    constructor(@InjectModel(Phone.name) private phoneModel: Model<Phone>) {}

    // Tạo mới
    async createPhone(data: Partial<Phone>) {
        const lastPhone = await this.phoneModel
            .findOne()
            .sort({ phone_id: -1 });
        const nextId = lastPhone?.phone_id ? lastPhone.phone_id + 1 : 1;
        return this.phoneModel.create({ ...data, phone_id: nextId });
    }

    // Lấy danh sách (chỉ hiển thị public)
    async getAllPhones() {
        return this.phoneModel
            .find({ is_public: true })
            .sort({ phone_id: 1 })
            .exec();
    }

    // Lấy theo ID
    async getPhoneById(phone_id: number) {
        const phone = await this.phoneModel.findOne({
            phone_id,
            is_public: true,
        });
        if (!phone) throw new NotFoundException("Không tìm thấy điện thoại");
        return phone;
    }

    // Cập nhật
    async updatePhone(phone_id: number, updateData: Partial<Phone>) {
        const updated = await this.phoneModel.findOneAndUpdate(
            { phone_id, is_public: true },
            { ...updateData, updateAt: new Date() },
            { new: true },
        );
        if (!updated)
            throw new NotFoundException(
                "Không tìm thấy điện thoại để cập nhật",
            );
        return {
            message: "Đã cập nhật thành cong",
            phone_id: updated.phone_id,
        };
    }

    // Xoá mềm (chỉ đổi is_public thành false)
    async softDeletePhone(phone_id: number) {
        const deleted = await this.phoneModel.findOneAndUpdate(
            { phone_id },
            { is_public: false, updateAt: new Date() },
            { new: true },
        );
        if (!deleted)
            throw new NotFoundException("Không tìm thấy điện thoại để xoá");
        return {
            message: "Đã xoá (ẩn) thành công",
            phone_id: deleted.phone_id,
        };
    }
}
