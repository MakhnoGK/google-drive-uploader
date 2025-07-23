import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '~/files/entities/file.entity';

@Injectable()
export class DatabaseFileService {
  constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {}

  saveFile({ id, name }: { name: string; id: string }) {
    const driveUrl = `https://drive.google.com/file/d/${id}/view`;
    const fileEntity = this.fileRepository.create({ driveUrl, name });

    return this.fileRepository.save(fileEntity);
  }

  getList() {
    // TODO(Hryhorii): implement pagination
    return this.fileRepository.find();
  }
}
