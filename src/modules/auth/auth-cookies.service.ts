import { Injectable } from '@nestjs/common';
import { Response, Request } from 'express';

@Injectable()
export class AuthCookiesService {
  private readonly REFRESH_TOKEN_COOKIE = 'refreshToken';

  private get baseOptions() {
    return {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict' as const,
      path: '/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    };
  }

  public setRefreshToken(res: Response, token: string): void {
    res.cookie(this.REFRESH_TOKEN_COOKIE, token, this.baseOptions);
  }

  public clearRefreshToken(res: Response): void {
    res.clearCookie(this.REFRESH_TOKEN_COOKIE, {
      path: this.baseOptions.path,
    });
  }

  public getRefreshToken(req: Request): string | undefined {
    return req.cookies?.[this.REFRESH_TOKEN_COOKIE];
  }
}
