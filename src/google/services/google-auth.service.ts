import * as assert from 'node:assert';
import { writeFile } from 'node:fs/promises';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { google } from 'googleapis';
import { CREDENTIALS_FILE_PATH } from '~/google/constants';
import { CredentialsDto } from '../dto/credentials.dto';

@Injectable()
export class GoogleAuthService implements OnModuleInit {
  private authClient: OAuth2Client;

  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    this.authClient = new google.auth.OAuth2({
      clientId: this.configService.get('GOOGLE_CLIENT_ID'),
      clientSecret: this.configService.get('GOOGLE_CLIENT_SECRET'),
      redirectUri: this.configService.get('GOOGLE_REDIRECT_URL'),
    });

    this.authClient.setCredentials({
      access_token: this.configService.get('access_token'),
      refresh_token: this.configService.get('refresh_token'),
      expiry_date: this.configService.get('expiry_date'),
    });
  }

  getAuthClient() {
    return this.authClient;
  }

  getAuthUrl() {
    return this.authClient.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/drive.file'],
    });
  }

  async authenticate(code: string) {
    const {
      tokens: { access_token, refresh_token, expiry_date },
    } = await this.authClient.getToken(code);

    assert(access_token, 'Failed to retrieve access token from Google OAuth2 client');
    assert(refresh_token, 'Failed to retrieve refresh token from Google OAuth2 client');

    await this.syncCredentials(CredentialsDto.fromPlain({ access_token, refresh_token, expiry_date }));
  }

  isAuthenticated() {
    const { access_token, refresh_token, expiry_date } = this.authClient.credentials;

    return access_token && refresh_token && expiry_date! >= Date.now();
  }

  async refreshAccessToken() {
    const { credentials } = await this.authClient.refreshAccessToken();
    const { access_token, refresh_token, expiry_date } = credentials;

    assert(access_token && refresh_token && expiry_date, 'Unable to refresh token');

    await this.syncCredentials(CredentialsDto.fromPlain({ access_token, refresh_token, expiry_date }));
  }

  getAccessToken() {
    const token = this.authClient.credentials.access_token;

    assert(token, 'Failed to retrieve access token from Google OAuth2 client');

    return token;
  }

  private async syncCredentials(credentialsDto: CredentialsDto) {
    await Promise.all([this.saveCredentials(credentialsDto), this.authClient.setCredentials(credentialsDto)]);
  }

  private async saveCredentials(credentialsDto: CredentialsDto) {
    await writeFile(CREDENTIALS_FILE_PATH, JSON.stringify(credentialsDto));
  }
}
