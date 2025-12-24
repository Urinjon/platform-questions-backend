import { Injectable } from "@nestjs/common";
import { Prisma } from "generated/prisma/client";




import { PrismaService } from "src/modules/common/prisma/prisma.service";


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