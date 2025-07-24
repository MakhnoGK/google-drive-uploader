import { Expose, plainToInstance, Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class PaginationRequestDto {
  @Expose()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  page: number;

  @Expose()
  @IsNumber()
  @Min(1)
  @Type(() => Number)
  pageSize: number;

  static fromPlain(plain: Partial<PaginationRequestDto>) {
    return plainToInstance(PaginationRequestDto, plain);
  }
}
