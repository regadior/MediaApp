import { IsBoolean } from 'class-validator';

export class FavouriteGameDto {
  @IsBoolean({ message: 'The whishlist field must be a boolean value.' })
  whishlist: boolean;
}
