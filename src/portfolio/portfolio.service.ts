import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreatePortfolioDto } from './dto/portfolio.dto';

@Injectable()
export class PortfolioService {
  constructor(private prisma: PrismaService) {}

  async create(createPortfolioDto: CreatePortfolioDto) {
    try {
      const portfolio = await this.prisma.portfolio.create({
        data: createPortfolioDto,
      });

      return portfolio;
    } catch (error) {
      console.error(error);
    }
  }

  async findAll() {
    try {
      const portfolios = await this.prisma.portfolio.findMany();

      return portfolios;
    } catch (error) {
      console.error(error);
    }
  }

  async findOne(id: number) {
    try {
      const portfolio = await this.prisma.portfolio.findUnique({
        where: { id },
      });

      return portfolio;
    } catch (error) {
      console.error(error);
    }
  }
}
