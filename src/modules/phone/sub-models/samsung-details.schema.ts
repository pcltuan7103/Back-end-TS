import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

// samsung-details.schema.ts
@Schema()
export class SamsungDetails {
    @Prop()
    android_version: string;

    @Prop()
    chip: string;

    @Prop()
    s_pen_support: boolean;

    @Prop()
    type: string;

    @Prop()
    color: string;
}

export const SamsungDetailsSchema =
    SchemaFactory.createForClass(SamsungDetails);
