import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { RemoteFileUploadService } from '~/files/services/remote-file-upload.service';
import { UploadFileJobMeta } from '~/files/types';
import { QueueNames } from '~/queue/constants';

@Processor(QueueNames.DOWNLOAD_AND_UPLOAD)
export class RemoteFileUploadWorker extends WorkerHost {
  constructor(private readonly remoteFileUploadService: RemoteFileUploadService) {
    super();
  }

  async process(job: Job<UploadFileJobMeta>) {
    await this.remoteFileUploadService.upload(job.data.url);
  }
}
