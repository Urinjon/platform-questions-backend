import { UserModel } from "../users/users.model";

export type AuthUserPayload = Pick<UserModel, "id" | "email" | "role">;

export type TokenPayload = {
  sub: string;
  email: string;
  role: string;
};
