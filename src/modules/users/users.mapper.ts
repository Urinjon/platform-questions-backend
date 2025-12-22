// src/modules/user/user.mapper.ts
import { Injectable } from "@nestjs/common";
import { User, StudentProfile } from "generated/prisma/client";
import { UserDto } from "./users.dto";

type UserWithProfile = User & {
  studentProfile?: StudentProfile | null;
};

@Injectable()
export class UsersMapper {
  public toDto(user: UserWithProfile): UserDto {
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

  public toDtos(users: UserWithProfile[]): UserDto[] {
    return users.map((u) => this.toDto(u));
  }
}
