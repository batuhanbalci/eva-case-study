import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateShareDto } from './dto/share.dto';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  async create(createShareDto: CreateShareDto) {
    try {
      const share = await this.prisma.share.create({
        data: createShareDto,
      });

      return share;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findAll() {
    try {
      const shares = await this.prisma.share.findMany();

      return shares;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async findOne(id: number) {
    try {
      const share = await this.prisma.share.findUnique({
        where: { id },
      });

      return share;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
