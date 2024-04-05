import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsPositive, IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @Type(() => Number)
  @IsNumber(
    { maxDecimalPlaces: 4 },
    { message: 'Price must contain max four decimal places' },
  )
  @IsPositive({
    message: 'Price must be  a positive value',
  })
  public price: number;
}
