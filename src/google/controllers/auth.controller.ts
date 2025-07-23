import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response as ResponseType } from 'express';
import { AuthCallbackQueryParamsDto } from '~/google/dto/auth-callback-query-params.dto';
import { AuthCallbackResponseDto } from '~/google/dto/auth-callback-response.dto';
import { GoogleAuthService } from '~/google/services/google-auth.service';

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
    return AuthCallbackResponseDto.fromPlain({ success: true, message: 'Authentication successful' });
  }
}
