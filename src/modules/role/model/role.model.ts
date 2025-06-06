import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema()
export class Role extends Document {
    @Prop({ unique: true, required: true })
    role_id: number;

    @Prop({ required: true, unique: true })
    name: string; // "Admin", "User"
}

export const RoleSchema = SchemaFactory.createForClass(Role);
