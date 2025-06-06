import { Prop, Schema } from "@nestjs/mongoose";

@Schema()
export class Role extends Document {
    @Prop({ unique: true, required: true })
    role_id: number;

    @Prop({ required: true, unique: true })
    name: string; // "Admin", "User"
}
