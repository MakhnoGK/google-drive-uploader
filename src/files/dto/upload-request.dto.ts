import { Expose } from 'class-transformer';
import { ArrayNotEmpty, IsArray, IsDefined, IsUrl } from 'class-validator';

export class UploadRequestDto {
  @Expose()
  @IsDefined()
  @IsArray()
  @ArrayNotEmpty()
  @IsUrl({ require_valid_protocol: true, require_protocol: true }, { each: true })
  urls: string[];
}
