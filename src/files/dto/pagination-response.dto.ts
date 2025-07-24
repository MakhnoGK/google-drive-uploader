import { Expose, plainToInstance } from 'class-transformer';
import { IsArray, IsNumber, Min } from 'class-validator';

export class PaginateResponseDto<T> {
  @Expose()
  @IsArray()
  data: T[];

  @Expose()
  @IsNumber()
  total: number;

  @Expose()
  @IsNumber()
  @Min(1)
  page: number;

  @Expose()
  @IsNumber()
  @Min(1)
  pageSize: number;

  static fromPlain<T>(plain: Partial<PaginateResponseDto<T>>) {
    return plainToInstance(PaginateResponseDto<T>, plain);
  }
}
