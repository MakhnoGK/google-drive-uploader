import * as path from 'node:path';
import { Injectable } from '@nestjs/common';
import { DatabaseFileService } from '~/files/services/database-file.service';
import { RemoteFileService } from '~/files/services/remote-file.service';
import { CustomStreamChunkSizeTransform } from '~/files/transforms/custom-stream-chunk-size.transform';
import { GoogleDriveFilesService } from '~/google/services/google-drive-files.service';

const GOOGLE_DRIVE_CHUNK_SIZE = 1024 * 1024 * 2; // 2 Mb

@Injectable()
export class RemoteFileUploadService {
  constructor(
    private downloadService: RemoteFileService,
    private readonly googleDriveFileService: GoogleDriveFilesService,
    private readonly databaseFileService: DatabaseFileService
  ) {}

  async upload(url: string) {
    const filename = path.basename(url);
    const { contentLength, stream } = await this.downloadService.prepareDownload(url);
    const resumableUpload = await this.googleDriveFileService.createUpload({ contentLength, filename });
    const transformedStream = new CustomStreamChunkSizeTransform(GOOGLE_DRIVE_CHUNK_SIZE);

    stream.pipe(transformedStream);

    for await (const chunk of transformedStream) {
      const result = await resumableUpload.uploadChunk(chunk as Buffer);

      if (result) {
        console.log('success');
        break;
      }
    }

    // TODO(Hryhorii): Save file metadata to database
  }
}
