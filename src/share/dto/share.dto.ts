import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';

const SYMBOL_LENGTH = 3;

export class CreateShareDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(SYMBOL_LENGTH)
  @MaxLength(SYMBOL_LENGTH)
  @IsUppercase()
  readonly symbol: string;

  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  readonly price: number;
}
