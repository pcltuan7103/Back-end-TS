// iphone-details.schema.ts
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class IPhoneDetails {
    @Prop()
    ios_version: string;

    @Prop()
    chip: string;

    @Prop()
    material: string;

    @Prop()
    color: string;

    @Prop()
    type: string;
}

export const IPhoneDetailsSchema = SchemaFactory.createForClass(IPhoneDetails);
