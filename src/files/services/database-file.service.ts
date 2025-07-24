import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from '~/files/entities/file.entity';
import { PaginationRequestDto } from '../dto/pagination-request.dto';
import { PaginateResponseDto } from '../dto/pagination-response.dto';

@Injectable()
export class DatabaseFileService {
  constructor(@InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>) {}

  saveFile({ id, name }: { name: string; id: string }) {
    const driveUrl = `https://drive.google.com/file/d/${id}/view`;
    const fileEntity = this.fileRepository.create({ driveUrl, name });

    return this.fileRepository.save(fileEntity);
  }

  getList() {
    return this.fileRepository.find();
  }

  async getPaginatedList({ page, pageSize }: PaginationRequestDto) {
    const offset = (page - 1) * pageSize;

    const total = await this.fileRepository.count();
    const files = await this.fileRepository.find({ skip: offset, take: pageSize });

    return PaginateResponseDto.fromPlain({
      data: files,
      total,
      page,
      pageSize,
    });
  }
}
