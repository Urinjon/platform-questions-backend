import { StudentProfile, User } from "@generated/prisma/client";

export type UserModel = User;

export type UserWithProfileModel = User & {
  studentProfile?: StudentProfile | null;
};
