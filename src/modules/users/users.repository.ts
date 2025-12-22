import { Injectable } from "@nestjs/common";
import { Prisma, User } from "generated/prisma/client";
import { UserModel } from "generated/prisma/models";




import { PrismaService } from "src/config/prisma/prisma.service";


@Injectable()
export class UsersRepository {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    findMany(args?: Prisma.UserFindManyArgs) {
        return this.prisma.user.findMany(args);
    }

    findById(id: string) {
        return this.prisma.user.findUnique({ where: { id } });
    }
}