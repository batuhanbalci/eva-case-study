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

    return { share, portfolio };
  }

  async buy(createTradeDto: CreateTradeDto) {
    const { quantity } = createTradeDto;

    const { share, portfolio } = await this.getPortfolioAndShare(
      createTradeDto,
    );

    const trade = await this.prisma.portfolioShare.upsert({
      where: {
        portfolioId_shareId: {
          portfolioId: portfolio.id,
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
      message: `Trade successful. ${quantity} shares bought for ${share.price}$ each`,
      balance: trade.quantity,
      portfolio: portfolio,
      share: share,
    };
  }

  async sell(createTradeDto: CreateTradeDto) {
    const { quantity } = createTradeDto;

    const { share, portfolio } = await this.getPortfolioAndShare(
      createTradeDto,
    );

    const portfolioShare = await this.prisma.portfolioShare.findUnique({
      where: {
        portfolioId_shareId: {
          portfolioId: portfolio.id,
          shareId: share.id,
        },
      },
    });

    if (portfolioShare === null) {
      throw generateHttpException(
        HttpStatus.BAD_REQUEST,
        'Portfolio does not contain this share',
      );
    }

    if (portfolioShare.quantity < quantity) {
      throw generateHttpException(
        HttpStatus.BAD_REQUEST,
        'Insufficient quantity',
      );
    }

    const trade = await this.prisma.portfolioShare.update({
      where: {
        portfolioId_shareId: {
          portfolioId: portfolio.id,
          shareId: share.id,
        },
      },
      data: {
        quantity: {
          decrement: quantity,
        },
      },
    });

    return {
      message: `Trade successful. ${quantity} shares sold for ${share.price}$ each`,
      balance: trade.quantity,
      portfolio: portfolio,
      share: share,
    };
  }
}
