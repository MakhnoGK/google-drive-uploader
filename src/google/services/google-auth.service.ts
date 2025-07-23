import * as assert from 'node:assert';
import { writeFile } from 'node:fs/promises';
import * as path from 'node:path';
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
      redirectUri: this.configService.get('GOOGLE_REDIRECT_URI'),
    });

    this.authClient.setCredentials({
      refresh_token: this.configService.get('refreshToken'),
    });
  }

  getAuthUrl() {
    return this.authClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file'],
    });
  }

  async saveAuthCredentials(code: string) {
    const {
      tokens: { access_token, refresh_token },
    } = await this.authClient.getToken(code);

    assert(access_token, 'Failed to retrieve access token from Google OAuth2 client');
    assert(refresh_token, 'Failed to retrieve refresh token from Google OAuth2 client');

    this.authClient.setCredentials({ access_token, refresh_token });
    await this.writeTokens(access_token, refresh_token);
  }

  async getAccessToken() {
    const { token } = await this.authClient.getAccessToken();

    assert(token, 'Failed to retrieve access token from Google OAuth2 client');

    return token;
  }

  private async writeTokens(accessToken: string, refreshToken: string) {
    const data = { accessToken, refreshToken };
    await writeFile(path.resolve(process.cwd(), 'google_tokens.json'), JSON.stringify(data));
  }
}
