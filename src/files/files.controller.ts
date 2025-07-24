import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UploadRequestDto } from '~/files/dto/upload-request.dto';
import { UploadResponseDto } from '~/files/dto/upload-response.dto';
import { DatabaseFileService } from '~/files/services/database-file.service';
import { RemoteFileUploadQueueService } from '~/files/services/remote-file-upload-queue.service';
import { GoogleAuthGuard } from '~/google/guards/google-auth.guard';
import { PaginationRequestDto } from './dto/pagination-request.dto';

@Controller('files')
export class FilesController {
  constructor(
    private readonly downloadUploadQueueService: RemoteFileUploadQueueService,
    private readonly databaseFileService: DatabaseFileService
  ) {}

  @UseGuards(GoogleAuthGuard)
  @Get('list')
  list(@Query() pagination: PaginationRequestDto) {
    return this.databaseFileService.getPaginatedList(pagination);
  }

  @UseGuards(GoogleAuthGuard)
  @Post('upload')
  async upload(@Body() requestDto: UploadRequestDto) {
    await this.downloadUploadQueueService.enqueue(requestDto.urls);

    return UploadResponseDto.fromPlain({ success: true });
  }
}
