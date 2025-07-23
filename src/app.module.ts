import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FilesModule } from '~/files/files.module';
import { QueueModule } from '~/queue/queue.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ConfigModule.forRoot(), HttpModule, FilesModule, QueueModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
