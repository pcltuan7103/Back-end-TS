import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import {
    IPhoneDetails,
    IPhoneDetailsSchema,
} from "../sub-models/iphone-details.schema";
import {
    SamsungDetails,
    SamsungDetailsSchema,
} from "../sub-models/samsung-details.schema";
import {
    XiaomiDetails,
    XiaomiDetailsSchema,
} from "../sub-models/xiaomi-details.schema";

@Schema({ timestamps: true })
export class Phone extends Document {
    @Prop({ unique: true })
    phone_id: number;

    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    brand: "Apple" | "Samsung" | "Xiaomi";

    @Prop()
    image_url: string;

    @Prop()
    price: number;

    @Prop()
    stock: number;

    @Prop()
    status: "New" | "Sale" | "Hot";

    @Prop()
    sale: number;

    @Prop({ default: true })
    is_public: boolean;

    @Prop()
    createAt: Date;

    @Prop()
    updateAt: Date;

    @Prop({ type: IPhoneDetailsSchema })
    iphone_details?: IPhoneDetails;

    @Prop({ type: SamsungDetailsSchema })
    samsung_details?: SamsungDetails;

    @Prop({ type: XiaomiDetailsSchema })
    xiaomi_details?: XiaomiDetails;
}

export const PhoneSchema = SchemaFactory.createForClass(Phone);
