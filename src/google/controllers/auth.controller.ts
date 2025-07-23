import { Controller, Get, Query, Res } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Response as ResponseType } from 'express';
import { GoogleAuthService } from '~/google/services/google-auth.service';

class AuthCallbackQueryParamsDto {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  scope: string;
}

@Controller('google/auth')
export class AuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @Get('/')
  authenticate(@Res() response: ResponseType) {
    const authUrl = this.googleAuthService.getAuthUrl();
    return response.redirect(authUrl);
  }

  @Get('callback')
  async handleCallback(@Query() { code }: AuthCallbackQueryParamsDto) {
    await this.googleAuthService.saveAuthCredentials(code);
    return { success: true, message: 'Authentication successful' };
  }
}
