// src/auth/refresh-token.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/modules/common/prisma/prisma.service';


@Injectable()
export class RefreshTokenService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async createToken(userId: string) {
    const payload = { sub: userId };
    const token = this.jwtService.sign(payload, { expiresIn: '7d' }); // refresh token

    await this.prisma.refreshToken.create({
      data: { token, userId },
    });

    return token;
  }

  async verifyToken(token: string) {
    const record = await this.prisma.refreshToken.findUnique({ where: { token } });
    if (!record) return null;

    try {
      const payload = this.jwtService.verify(token);
      return { userId: payload.sub };
    } catch {
      return null;
    }
  }

  async revokeToken(token: string) {
    await this.prisma.refreshToken.delete({ where: { token } });
  }
}
