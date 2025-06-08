// cloudinary.service.ts
import { Injectable } from "@nestjs/common";
import { UploadApiResponse } from "cloudinary";
import cloudinary from "src/utils/cloudinary";

@Injectable()
export class CloudinaryService {
    async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader
                .upload_stream({ folder: "phones" }, (error, result) => {
                    if (error || !result)
                        return reject(error || new Error("Upload failed"));
                    resolve(result);
                })
                .end(file.buffer);
        });
    }

    async deleteImage(publicId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.destroy(publicId, (error, result) => {
                if (error) return reject(error);
                resolve(result);
            });
        });
    }
}
