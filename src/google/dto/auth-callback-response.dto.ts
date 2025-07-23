import { Expose, plainToInstance } from 'class-transformer';
import { IsBoolean, IsString } from 'class-validator';

export class AuthCallbackResponseDto {
  @Expose()
  @IsBoolean()
  success: boolean;

  @Expose()
  @IsString()
  message: string;

  static fromPlain(plain: Partial<AuthCallbackResponseDto>) {
    return plainToInstance(AuthCallbackResponseDto, plain);
  }
}
