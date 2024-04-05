import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  onModuleInit() {
    this.$connect();
    this.logger.log('Database connected successfully');
  }

  create(createProductDto: CreateProductDto) {
    return this.product.create({
      data: createProductDto,
    });
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    const count = await this.product.count();
    const pages = Math.ceil(count / limit);

    const data = await this.product.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        aviable: true,
      },
    });

    return {
      count,
      current_page: page,
      data,
      pages,
    };
  }

  async findOne(id: number) {
    const product = await this.product.findUnique({
      where: {
        id,
        aviable: true,
      },
    });

    if (!product) {
      throw new NotFoundException(
        `There's not records for the product ID: ${id}`,
      );
    }

    return product;
  }

  async update(updateProductDto: UpdateProductDto) {
    const { id, ...data } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: {
        id,
      },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.product.update({
      where: {
        id,
      },
      data: { aviable: false },
    });
  }
}
