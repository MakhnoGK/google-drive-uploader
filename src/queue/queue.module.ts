import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QueueNames } from '~/queue/constants';

@Module({
  imports: [
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        connection: {
          host: configService.get('REDIS_HOST'),
          port: 6379,
        },
      }),
    }),
    BullModule.registerQueue({ name: QueueNames.DOWNLOAD_AND_UPLOAD }),
  ],
  providers: [],
  exports: [BullModule],
})
export class QueueModule {}
