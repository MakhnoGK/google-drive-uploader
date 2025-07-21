import { Module } from '@nestjs/common';
import { QueueModule } from '~/queue/queue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [QueueModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
