import * as assert from 'node:assert';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private authClient: OAuth2Client;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.authClient = new google.auth.OAuth2({
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
    });

    this.authClient.setCredentials({
      refresh_token: this.configService.get('GOOGLE_REFRESH_TOKEN'),
    });
  }

  async getAccessToken() {
    const { token } = await this.authClient.getAccessToken();
    assert(token, 'Failed to retrieve access token from Google OAuth2 client');

    return token;
  }
}
