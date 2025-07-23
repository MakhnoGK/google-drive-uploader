import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UploadRequestDto } from '~/files/dto/upload-request.dto';
import { UploadResponseDto } from '~/files/dto/upload-response.dto';
import { DatabaseFileService } from '~/files/services/database-file.service';
import { RemoteFileUploadQueueService } from '~/files/services/remote-file-upload-queue.service';
import { GoogleAuthGuard } from '~/google/guards/google-auth.guard';

@Controller('files')
export class FilesController {
  constructor(
    private readonly downloadUploadQueueService: RemoteFileUploadQueueService,
    private readonly databaseFileService: DatabaseFileService
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('list')
  list() {
    return this.databaseFileService.getList();
  }

  @UseGuards(GoogleAuthGuard)
  @Post('upload')
  async upload(@Body() requestDto: UploadRequestDto) {
    await this.downloadUploadQueueService.enqueue(requestDto.urls);

    return UploadResponseDto.fromPlain({ success: true });
  }
}
