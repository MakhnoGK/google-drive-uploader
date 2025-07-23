import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from '../services/google-auth.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  canActivate(context: ExecutionContext) {
    const response = context.switchToHttp().getResponse<Response>();

    const authClient = this.googleAuthService.getAuthClient();
    const { access_token, refresh_token, expiry_date } = authClient.credentials;

    if (!access_token || !refresh_token || (expiry_date || 0) <= Date.now()) {
      response.redirect(this.googleAuthService.getAuthUrl());
      return false;
    }

    return true;
  }
}
