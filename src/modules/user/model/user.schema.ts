import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

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

    @Prop()
    role: string;

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
