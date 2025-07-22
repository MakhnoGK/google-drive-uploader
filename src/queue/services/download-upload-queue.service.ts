import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QueueNames } from '~/queue/constants';

@Injectable()
export class DownloadUploadQueueService {
  constructor(@InjectQueue(QueueNames.DOWNLOAD_AND_UPLOAD) private readonly downloadAndUploadQueue: Queue) {}

  async enqueue(urls: string[]) {
    await Promise.all(urls.map((url) => this.downloadAndUploadQueue.add('downloadAndUpload', { url })));
  }
}
