import { Body, Controller, Post } from '@nestjs/common';
import { CreateTradeDto } from './dto/trade.dto';
import { TradeService } from './trade.service';

@Controller('trade')
export class TradeController {
  constructor(private readonly tradeService: TradeService) {}

  @Post('buy')
  buy(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.buy(createTradeDto);
  }

  @Post('sell')
  sell(@Body() createTradeDto: CreateTradeDto) {
    return this.tradeService.sell(createTradeDto);
  }
}
