import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateHttpException } from 'src/utils/error.util';
import { CreateShareDto, UpdateShareDto } from './dto/share.dto';

@Injectable()
export class ShareService {
  constructor(private prisma: PrismaService) {}

  async create(createShareDto: CreateShareDto) {
    return await this.prisma.share.create({
      data: createShareDto,
    });
  }

  async findAll() {
    return await this.prisma.share.findMany();
  }

  async findOne(id: number) {
    const share = await this.prisma.share.findUnique({
      where: { id },
    });

    if (share === null) {
      throw generateHttpException(HttpStatus.NOT_FOUND, 'Share not found');
    }

    return share;
  }

  async updatePrice(id: number, createShareDto: UpdateShareDto) {
    const share = await this.findOne(id);

    return await this.prisma.share.update({
      where: { id: share.id },
      data: createShareDto,
    });
  }
}
