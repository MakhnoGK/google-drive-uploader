import { Module } from '@nestjs/common';
import { FilesModule } from '~/files/files.module';
import { QueueModule } from '~/queue/queue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule, QueueModule, DatabaseModule, FilesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
