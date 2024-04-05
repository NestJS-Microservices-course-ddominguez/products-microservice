import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @Type(() => Number)
  @IsNumber()
  @IsPositive({
    message: 'Product ID must be  a positive value',
  })
  id: number;
}
