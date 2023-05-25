import { IsISO8601, IsNotEmpty, IsString } from 'class-validator';

export class UserGameSavegameDto {
  @IsString({ message: 'The name field must be a string.' })
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  name: string;
  @IsString({ message: 'The state field must be a string.' })
  @IsNotEmpty({ message: 'The state field cannot be empty.' })
  state: string;
  @IsString({ message: 'The description field must be a string.' })
  @IsNotEmpty({ message: 'The description field cannot be empty.' })
  description: string;
  @IsISO8601({ strict: true }, { message: 'The save date field must be a valid ISO 8601 date string.' })
  @IsNotEmpty({ message: 'The save date field cannot be empty.' })
  dateSave: string;
}
