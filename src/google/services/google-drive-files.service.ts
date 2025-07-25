import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Expose } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';
import { ResumableUpload } from '~/google/common/resumable-download';
import { GoogleAuthService } from '~/google/services/google-auth.service';

class CreateUploadRequestDataDto {
  @Expose()
  @IsString()
  filename: string;

  @Expose()
  @IsNumber()
  @IsPositive()
  contentLength: number;
}

@Injectable()
export class GoogleDriveFilesService {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly httpService: HttpService
  ) {}

  async createUpload({ contentLength, filename }: CreateUploadRequestDataDto) {
    if (this.googleAuthService.isAuthenticated()) await this.googleAuthService.refreshAccessToken();
    const accessToken = this.googleAuthService.getAccessToken();

    return ResumableUpload.create(this.httpService, { accessToken, contentLength, filename });
  }
}
