import { Readable } from 'node:stream';
import { Expose } from 'class-transformer';
import { IsNumber, IsObject } from 'class-validator';

export class PreparedDownloadInfo {
  @Expose()
  @IsNumber()
  contentLength: number;

  @Expose()
  @IsObject()
  stream: Readable;
}
