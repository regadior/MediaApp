import { IsBoolean, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UserGameDto {
  @IsOptional()
  @IsNumber({}, { message: 'The score field must be a number.' })
  @IsNotEmpty({ message: 'The score field cannot be empty.' })
  score: number;

  @IsOptional()
  @IsBoolean({ message: 'The whishlist field must be a boolean value.' })
  whishlist: boolean;

  @IsOptional()
  @IsString({ message: 'The state field must be a string.' })
  @IsNotEmpty({ message: 'The state field cannot be empty.' })
  @IsIn(['uncategorized', 'playing', 'completed', 'played', 'not played', 'abandoned'], {
    message: 'Invalid state value. The valid ones are: uncategorized, playing, completed, played, not played, abandoned',
  })
  state: string;
}
