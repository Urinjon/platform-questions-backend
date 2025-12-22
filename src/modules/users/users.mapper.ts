// src/modules/user/user.mapper.ts
import { Injectable } from "@nestjs/common";

import { UserWithProfileModel } from "./users.model";
import { UserType } from "./dto/users.dto";

@Injectable()
export class UsersMapper {
  toGraphQL(user: UserWithProfileModel): UserType {
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,

      student: user.studentProfile
        ? {
            lastName: user.studentProfile.lastName,
            phone: user.studentProfile.phone,
            university: user.studentProfile.university,
          }
        : undefined,
    };
  }

  toGraphQLList(users: UserWithProfileModel[]): UserType[] {
    return users.map((u) => this.toGraphQL(u));
  }
}
