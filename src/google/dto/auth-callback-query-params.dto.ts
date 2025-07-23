import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class AuthCallbackQueryParamsDto {
  @Expose()
  @IsString()
  code: string;

  @Expose()
  @IsString()
  scope: string;
}
