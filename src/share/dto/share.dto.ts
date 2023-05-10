import {
  IsDecimal,
  IsNotEmpty,
  IsString,
  IsUppercase,
  MaxLength,
  MinLength,
} from 'class-validator';
import { SYMBOL_LENGTH } from 'src/common/constants';

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

export class UpdateShareDto {
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '2' })
  readonly price: number;
}
