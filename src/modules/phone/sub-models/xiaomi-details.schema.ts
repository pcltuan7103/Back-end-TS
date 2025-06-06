import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class XiaomiDetails {
    @Prop()
    miui_version: string;

    @Prop()
    battery: number;

    @Prop()
    charging: string;

    @Prop()
    type: string;

    @Prop()
    color: string;
}

export const XiaomiDetailsSchema = SchemaFactory.createForClass(XiaomiDetails);
