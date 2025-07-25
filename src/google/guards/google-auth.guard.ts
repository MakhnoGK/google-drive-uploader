import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Response } from 'express';
import { GoogleAuthService } from '../services/google-auth.service';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  canActivate(context: ExecutionContext) {
    const response = context.switchToHttp().getResponse<Response>();

    if (!this.googleAuthService.isAuthenticated()) {
      response.redirect(this.googleAuthService.getAuthUrl());
      return false;
    }

    return true;
  }
}
