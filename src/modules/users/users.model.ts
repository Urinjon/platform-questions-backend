// import { StudentProfile, User, UserRole } from "generated/prisma/client";



// type UserModel = User;

// type UserWithProfileModel = User & {
//   studentProfile?: StudentProfile | null;
// };

// type UserRoleModel = UserRole; 

// export type { UserModel, UserWithProfileModel, UserRoleModel };

import { StudentProfile, User, UserRole } from 'generated/prisma/client';

export type UserModel = User;

export type UserWithProfileModel = User & {
  studentProfile?: StudentProfile | null;
};

export type AuthUserModel = Pick<User, 'id' | 'email' | 'role'>;

export type UserRoleModel = UserRole;
