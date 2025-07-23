import * as https from 'node:https';
import { Readable } from 'node:stream';
import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNumber, IsObject } from 'class-validator';

class PreparedDownloadInfo {
  @Expose()
  @IsNumber()
  contentLength: number;

  @Expose()
  @IsObject()
  stream: Readable;
}

@Injectable()
export class RemoteFileService {
  async prepareDownload(url: string) {
    return new Promise<PreparedDownloadInfo>((resolve, reject) => {
      https.get(url, (responseStream) => {
        if (responseStream.statusCode != 200)
          reject(new Error(`Failed to initiate file download: ${responseStream.statusMessage}`));

        const stream = responseStream;
        const contentLength = parseInt(stream.headers['content-length']!);

        resolve({ stream, contentLength });
      });
    });
  }
}
