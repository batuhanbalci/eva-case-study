import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CreateShareDto } from './dto/share.dto';
import { ShareService } from './share.service';

@Controller('share')
export class ShareController {
  constructor(private readonly shareService: ShareService) {}

  @Post()
  create(@Body() createShareDto: CreateShareDto) {
    return this.shareService.create(createShareDto);
  }

  @Get()
  findAll() {
    return this.shareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.shareService.findOne(id);
  }
}
