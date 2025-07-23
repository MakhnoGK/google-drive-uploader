import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { QueueNames } from '~/queue/constants';

@Injectable()
export class RemoteFileUploadQueueService {
  constructor(@InjectQueue(QueueNames.DOWNLOAD_AND_UPLOAD) private readonly remoteFileUploadQueue: Queue) {}

  async enqueue(urls: string[]) {
    await Promise.all(urls.map((url) => this.remoteFileUploadQueue.add('downloadAndUpload', { url })));
  }
}
