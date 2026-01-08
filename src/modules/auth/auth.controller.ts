import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import {
  ApiTags,
  ApiOperation,
  ApiBody,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiBearerAuth,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { LoginReqDto, AccessTokenResDto, SuccessResDto } from './auth.dto';
import express from 'express';
import { AuthCookiesService } from './auth-cookies.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly authCookies: AuthCookiesService
  ) {}


  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({ type: LoginReqDto })
  @ApiOkResponse({
    description: 'Login successful',
    type: AccessTokenResDto,
  })
  @ApiUnauthorizedResponse({
    description: 'Invalid credentials',
  })
  async login(
    @Body() body: LoginReqDto,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<AccessTokenResDto> {
    const user = await this.authService.validateUser(
      body.email,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const { accessToken, refreshToken } =
      await this.authService.login(user);

    this.authCookies.setRefreshToken(res, refreshToken);

    return { accessToken, refreshToken };
  }


  @Post('refresh')
  @ApiOperation({ summary: 'Refresh access token' })
  @ApiCookieAuth('refreshToken')
  @ApiOkResponse({
    description: 'Access token refreshed',
    type: AccessTokenResDto,
  })
  @ApiUnauthorizedResponse({
    description: 'No or invalid refresh token',
  })
  async refresh(
    @Req() req: express.Request,
    @Res({ passthrough: true }) res: express.Response,
  ): Promise<AccessTokenResDto> {
    const refreshToken = this.authCookies.getRefreshToken(req);
    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token');
    }

    const { accessToken, refreshToken: newRefreshToken } =
      await this.authService.refresh(refreshToken);

    this.authCookies.setRefreshToken(res, newRefreshToken);

    return { accessToken, refreshToken };
  }


  @Post('logout')
  @ApiOperation({ summary: 'Выход' })
  @ApiOkResponse({
    description: 'Успешный выход',
    type: SuccessResDto,
  })
  logout(
    @Res({ passthrough: true }) res: express.Response,
  ): SuccessResDto {
    this.authCookies.clearRefreshToken(res);
    return { success: true };
  }


  @UseGuards(JwtAuthGuard)
  @Post('profile')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user profile' })
  @ApiOkResponse({
    description: 'User profile from access token',
  })
  @ApiUnauthorizedResponse({
    description: 'Unauthorized',
  })
  getProfile(@Req() req) {
    return "test access token";
  }
}
