import { Module } from '@nestjs/common';
import { FilesController } from '~/files/files.controller';
import { QueueModule } from '~/queue/queue.module';

@Module({
  imports: [QueueModule],
  controllers: [FilesController],
})
export class FilesModule {}
