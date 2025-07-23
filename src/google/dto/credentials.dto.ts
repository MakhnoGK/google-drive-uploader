import { plainToInstance } from 'class-transformer';

export class CredentialsDto {
  access_token: string;
  refresh_token: string;
  expiry_date: number;

  static fromPlain(plain: object) {
    return plainToInstance(CredentialsDto, plain);
  }
}
