import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RemoteFileUploadService } from '~/files/services/remote-file-upload.service';
import { QueueNames } from '~/queue/constants';

@Processor(QueueNames.DOWNLOAD_AND_UPLOAD)
export class RemoteFileUploadWorker extends WorkerHost {
  constructor(private readonly remoteFileUploadService: RemoteFileUploadService) {
    super();
  }

  // TODO: Extract type
  async process(job: Job<{ url: string }>) {
    await this.remoteFileUploadService.upload(job.data.url);
  }
}
