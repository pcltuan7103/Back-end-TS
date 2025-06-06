import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { getModelToken } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role } from "./modules/role/model/role.model";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    const roleModel = app.get<Model<Role>>(getModelToken(Role.name));

    await roleModel.updateOne(
        { role_id: 1 },
        { role_id: 1, name: "Admin" },
        { upsert: true },
    );

    await roleModel.updateOne(
        { role_id: 2 },
        { role_id: 2, name: "User" },
        { upsert: true },
    );

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
