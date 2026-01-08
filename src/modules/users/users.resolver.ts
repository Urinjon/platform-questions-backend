import { UserType } from "./dto/users.dto";
import { Query, Resolver } from "@nestjs/graphql";
import { UsersService } from "./users.service";

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType], { name: "users" })
  findAllUsers() {
    return this.usersService.findAllUsers();
  }
}
