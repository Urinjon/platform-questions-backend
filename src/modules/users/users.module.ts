import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersRepository } from "./users.repository";
import { UsersMapper } from "./users.mapper";
import { UsersResolver } from "./users.resolver";

@Module({
  providers: [UsersResolver, UsersService, UsersRepository, UsersMapper],
})
export class UsersModule {}
