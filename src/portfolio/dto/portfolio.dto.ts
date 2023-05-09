import { IsNumber } from 'class-validator';

export class CreatePortfolioDto {
  @IsNumber()
  readonly userId: number;
}
