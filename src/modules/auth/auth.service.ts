// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";

import { RefreshTokenService } from "./refresh-token.service";

import { UserWithProfileModel } from "../users/users.model";
import { AuthUserPayload, TokenPayload } from "./auth.model";
import { PrismaService } from "../common/prisma/prisma.service";

class LoginResDto {
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private refreshTokenService: RefreshTokenService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserWithProfileModel | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
      include: { studentProfile: true },
    });

    if (!user) return null;

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return null;

    return user;
  }

  public async login(user: AuthUserPayload): Promise<LoginResDto> {
    const payload: TokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    const accessToken = this.jwtService.sign(payload, { expiresIn: "15m" });
    const refreshToken = await this.refreshTokenService.createToken(user.id);

    return {
      accessToken,
      refreshToken,
    };
  }

  async refresh(refreshToken: string): Promise<LoginResDto> {
    const tokenData = await this.refreshTokenService.verifyToken(refreshToken);
    if (!tokenData) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: tokenData.userId },
      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    return this.login(user);
  }
}
