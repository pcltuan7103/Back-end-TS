import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<string[]>(
            "roles",
            context.getHandler(),
        );
        if (!requiredRoles) return true;

        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const userRole =
            typeof user.role === "object" ? user.role.name : user.role;

        if (!requiredRoles.includes(userRole)) {
            throw new ForbiddenException(
                "Bạn không có quyền thực hiện thao tác này",
            );
        }

        return true;
    }
}
