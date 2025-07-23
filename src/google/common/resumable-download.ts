import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ResumableUploadCompleteResponse, ResumableUploadOptions } from '~/google/types';

export class ResumableUpload {
  private constructor(
    private readonly httpService: HttpService,
    public readonly sessionUri: string,
    private readonly accessToken: string,
    private readonly contentLength: number
  ) {}

  private currentOffset = 0;

  static async create(httpService: HttpService, { filename, contentLength, accessToken }: ResumableUploadOptions) {
    const response = await lastValueFrom(
      httpService.post(
        'https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable',
        {
          name: filename,
        },
        { headers: { Authorization: `Bearer ${accessToken}` } }
      )
    );

    const sessionUri = response?.headers['location'] as string;

    return new ResumableUpload(httpService, sessionUri, accessToken, contentLength);
  }

  async uploadChunk(chunk: Buffer) {
    const range = `bytes ${this.currentOffset}-${this.currentOffset + chunk.length - 1}/${this.contentLength}`;
    const response = await lastValueFrom(
      this.httpService.put<ResumableUploadCompleteResponse | string>(this.sessionUri, chunk, {
        headers: {
          'Content-Length': chunk.length,
          'Content-Range': range,
          Authorization: `Bearer ${this.accessToken}`,
        },
      })
    );

    // DOCS(Hryhorii): Google Drive API
    // https://developers.google.com/workspace/drive/api/guides/manage-uploads#http---single-request
    // A 200 OK or 201 Created response indicates that the upload was completed, and no further action is necessary.
    // A 308 Resume Incomplete response indicates that you must continue to upload the file.
    if (response.status != 200 && response.status != 201 && response.status != 308) {
      throw new Error(
        `Error uploading chunk: ${response.status} - ${response.statusText}: ${typeof response.data === 'string' ? response.data : ''}`
      );
    }

    if (response.status == 200 || response.status == 201) {
      return response.data as ResumableUploadCompleteResponse;
    }

    this.currentOffset += chunk.length;
  }

  [Symbol.dispose]() {
    this.currentOffset = 0;
  }
}
