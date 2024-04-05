import { Type } from 'class-transformer';
import { IsOptional, IsPositive } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @Type(() => Number)
  @IsPositive({
    message: 'Page must be  a positive value',
  })
  page?: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsPositive({
    message: 'Limit must be  a positive value',
  })
  limit?: number = 10;
}
