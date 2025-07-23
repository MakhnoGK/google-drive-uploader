import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from '~/files/entities/file.entity';
import { FilesController } from '~/files/files.controller';
import { DatabaseFileService } from '~/files/services/database-file.service';
import { RemoteFileUploadQueueService } from '~/files/services/remote-file-upload-queue.service';
import { RemoteFileUploadService } from '~/files/services/remote-file-upload.service';
import { RemoteFileService } from '~/files/services/remote-file.service';
import { RemoteFileUploadWorker } from '~/files/workers/remote-file-upload.worker';
import { GoogleModule } from '~/google/google.module';
import { QueueModule } from '~/queue/queue.module';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity]), QueueModule, GoogleModule],
  providers: [
    DatabaseFileService,
    RemoteFileService,
    RemoteFileUploadService,
    RemoteFileUploadQueueService,
    RemoteFileUploadWorker,
  ],
  exports: [RemoteFileUploadService],
  controllers: [FilesController],
})
export class FilesModule {}
