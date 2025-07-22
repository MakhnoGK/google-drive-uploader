import * as fs from 'node:fs';
import * as https from 'node:https';
import * as path from 'node:path';
import { HttpService } from '@nestjs/axios';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QueueNames } from '~/queue/constants';

@Processor(QueueNames.DOWNLOAD_AND_UPLOAD)
export class DownloadUploadWorker extends WorkerHost {
  constructor(private readonly httpService: HttpService) {
    super();
  }

  // TODO: Extract type
  async process(job: Job<{ url: string }>) {
    const filename = path.basename(job.data.url);

    // TODO: Download and upload to Drive
  }
}
