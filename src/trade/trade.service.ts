import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { generateHttpException } from 'src/utils/error.util';
import { CreateTradeDto } from './dto/trade.dto';

@Injectable()
export class TradeService {
  constructor(private prisma: PrismaService) {}

  async getPortfolioAndShare(createTradeDto: CreateTradeDto) {
    const { portfolioId, symbol } = createTradeDto;

    const [share, portfolio] = await this.prisma.$transaction([
      this.prisma.share.findUnique({
        where: {
          symbol: symbol,
        },
      }),
      this.prisma.portfolio.findUnique({
        where: {
          id: portfolioId,
        },
      }),
    ]);

    if (portfolio === null) {
      throw generateHttpException(HttpStatus.BAD_REQUEST, 'Invalid portfolio');
    }

    if (share === null) {
      throw generateHttpException(HttpStatus.BAD_REQUEST, 'Invalid symbol');
    }

    return [share, portfolio];
  }

  async buy(createTradeDto: CreateTradeDto) {
    const { portfolioId, symbol, quantity } = createTradeDto;

    const [share, portfolio] = await this.getPortfolioAndShare(createTradeDto);

    const trade = await this.prisma.portfolioShare.upsert({
      where: {
        portfolioId_shareId: {
          portfolioId: portfolioId,
          shareId: share.id,
        },
      },
      create: {
        quantity: quantity,
        portfolioId: portfolio.id,
        shareId: share.id,
      },
      update: {
        quantity: {
          increment: quantity,
        },
      },
    });

    return {
      message: 'Trade successful',
      quantity: trade.quantity,
      portfolio: portfolio,
      share: share,
    };
  }

  async sell(createTradeDto: CreateTradeDto) {
    const { portfolioId, symbol, quantity } = createTradeDto;

    const [share, portfolio] = await this.getPortfolioAndShare(createTradeDto);

    return null;
  }
}
