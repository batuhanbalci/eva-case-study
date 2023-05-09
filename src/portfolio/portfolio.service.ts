import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateHttpException } from 'src/utils/error.util';
import { CreatePortfolioDto } from './dto/portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: createPortfolioDto.userId },
    });

    if (user === null)
      throw generateHttpException(HttpStatus.NOT_FOUND, 'User not found');

    const portfolio = await this.prisma.portfolio.create({
      data: createPortfolioDto,
    });

    return portfolio;
  }

  async findAll() {
    return await this.prisma.portfolio.findMany();
  }

  async findOne(id: number) {
    const portfolio = await this.prisma.portfolio.findUnique({
      where: { id },
    });

    if (portfolio === null) {
      throw generateHttpException(HttpStatus.NOT_FOUND, 'Portfolio not found');
    }

    return portfolio;
  }
}
