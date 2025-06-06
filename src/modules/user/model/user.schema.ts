import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Role } from "src/modules/role/model/role.model";

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ unique: true })
    user_id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop()
    phone: string;

    @Prop()
    age: number;

    @Prop({ required: true })
    password: string;

    @Prop({ type: Types.ObjectId, ref: Role.name })
    role: Role;

    @Prop()
    avatar_image: string;

    @Prop()
    status: boolean;

    @Prop()
    createAt: Date;

    @Prop()
    updateAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
