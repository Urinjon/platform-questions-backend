import { ApiProperty } from "@nestjs/swagger";

export class LoginReqDto {
  @ApiProperty({
    example: "admin@example.com",
    description: "User email",
  })
  email: string;

  @ApiProperty({
    example: "hashed-password",
    description: "User password",
  })
  password: string;
}

export class AccessTokenResDto {
  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "JWT access token",
  })
  accessToken: string;

  @ApiProperty({
    example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    description: "JWT refresh token(mobile apps)",
  })
  refreshToken: string;
}

export class SuccessResDto {
  @ApiProperty({ example: true })
  success: boolean;
}
