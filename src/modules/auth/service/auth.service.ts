// modules/auth/service/auth.service.ts
import {
    BadRequestException,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/modules/user/model/user.schema";

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService,
    ) {}

    async login(email: string, password: string) {
        const user = await this.userModel.findOne({ email });
        if (!user) throw new UnauthorizedException("Email không tồn tại");

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new UnauthorizedException("Sai mật khẩu");

        const payload = { sub: user._id, email: user.email };
        const access_token = this.jwtService.sign(payload);

        return {
            message: "Đăng nhập thành công",
            access_token,
            user: {
                id: user.user_id,
                name: user.name,
                avatar_image: user.avatar_image,
            },
        };
    }

    async register(name: string, email: string, password: string) {
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) throw new BadRequestException("Email đã tồn tại");

        const hashedPassword = await bcrypt.hash(password, 10);

        const lastUser = await this.userModel
            .findOne({})
            .sort({ customId: -1 })
            .limit(1);

        const nextId = lastUser?.user_id ? lastUser.user_id + 1 : 1;

        const avatarSeed = `${name}-${Math.floor(Math.random() * 10000)}`;
        const avatarUrl = `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(avatarSeed)}`;

        const newUser = await this.userModel.create({
            user_id: nextId,
            name,
            email,
            password: hashedPassword,
            avatar_image: avatarUrl,
        });

        const payload = { sub: newUser._id, email: newUser.email };
        const access_token = this.jwtService.sign(payload);

        return {
            message: "Đăng ký thành công",
            access_token,
            user: {
                id: newUser.user_id,
            },
        };
    }
}
