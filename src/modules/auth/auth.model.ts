import { UserModel } from "../users/users.model";


export type AuthUserPayload = Pick<UserModel, 'id' | 'email' | 'role'>;