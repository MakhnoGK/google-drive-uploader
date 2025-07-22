import { Body, Controller, Get, Post } from '@nestjs/common';
import { UploadRequestDto } from '~/files/dto/upload-request.dto';
import { UploadResponseDto } from '~/files/dto/upload-response.dto';
import { DownloadUploadQueueService } from '~/queue/services/download-upload-queue.service';

@Controller('files')
export class FilesController {
  constructor(private readonly downloadUploadQueueService: DownloadUploadQueueService) {}

  @Get('list')
  list() {}

  @Post('upload')
  async upload(@Body() requestDto: UploadRequestDto) {
    await this.downloadUploadQueueService.enqueue(requestDto.urls);
    return UploadResponseDto.fromPlain({ success: true });
  }
}
