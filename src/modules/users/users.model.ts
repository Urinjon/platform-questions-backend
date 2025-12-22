import { StudentProfile, User, UserRole } from "generated/prisma/client";



type UserModel = User;

type UserWithProfileModel = User & {
  studentProfile?: StudentProfile | null;
};

type UserRoleModel = UserRole; 

export type { UserModel, UserWithProfileModel, UserRoleModel };