// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards, Req, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { LoginReqDto, LoginResDto } from './auth.dto';



@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  public async login(@Body() body: LoginReqDto): Promise<LoginResDto> {
    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) throw new UnauthorizedException('Invalid credentials');

    return this.authService.login(user);
  }

  @Post('refresh')
  async refresh(@Body() body: { refreshToken: string }) {
    return this.authService.refresh(body.refreshToken);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Req() req) {
    return req.user; // сюда попадет payload из access token
  }
}
