

import { ApiProperty } from '@nestjs/swagger';
import type { UserWithProfileModel } from '../users/users.model';

export class LoginReqDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

export class LoginResDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}