import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { QueueNames } from '~/queue/constants';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({ name: QueueNames.DOWNLOAD_AND_UPLOAD }),
  ],
  providers: [],
  exports: [BullModule],
})
export class QueueModule {}
