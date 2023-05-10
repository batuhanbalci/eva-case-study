import {
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  IsUppercase,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { SYMBOL_LENGTH } from 'src/common/constants';

export class CreateTradeDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(SYMBOL_LENGTH)
  @MaxLength(SYMBOL_LENGTH)
  @IsUppercase()
  readonly symbol: string;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  readonly quantity: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly portfolioId: number;
}
