export class ActionPhoneParams {
    name: string;
    brand: "Apple" | "Samsung" | "Xiaomi";
    price: number;
    image_url?: string;
    stock?: number;
    iphone_details?: IPhoneDetails;
    samsung_details?: SamsungDetails;
    xiaomi_details?: XiaomiDetails;
}

export class IPhoneDetails {
    ios_version: string;
    chip: string;
    material: string;
    color: string;
    type: string;
}

export class XiaomiDetails {
    miui_version: string;
    battery: number;
    charging: string;
    type: string;
    color: string;
}

export class SamsungDetails {
    android_version: string;
    chip: string;
    s_pen_support: boolean;
    type: string;
    color: string;
}
