import { HttpModule } from '@nestjs/axios';
import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueNames } from '~/queue/constants';
import { DownloadUploadQueueService } from '~/queue/services/download-upload-queue.service';
import { DownloadUploadWorker } from '~/queue/workers/download-upload.worker';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: QueueNames.DOWNLOAD_AND_UPLOAD }),
    HttpModule,
  ],
  providers: [DownloadUploadQueueService, DownloadUploadWorker],
  exports: [BullModule, DownloadUploadQueueService],
})
export class QueueModule {}
