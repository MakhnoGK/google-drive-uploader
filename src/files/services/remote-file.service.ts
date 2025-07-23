import * as https from 'node:https';
import { Injectable } from '@nestjs/common';
import { PreparedDownloadInfo } from '~/files/dto/prepared-download-info.dto';

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
