import { Expose, plainToInstance, Type } from 'class-transformer';
import { UploadRequestDto } from '~/files/dto/upload-request.dto';

export class UploadResponseDto {
  @Expose()
  @Type(() => Boolean)
  success: boolean;

  static fromPlain(plain: object & UploadResponseDto) {
    return plainToInstance(UploadRequestDto, plain);
  }
}
