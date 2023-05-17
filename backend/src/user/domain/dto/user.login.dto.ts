import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  username: string;
  @IsNotEmpty({ message: 'The password1 field cannot be empty.' })
  password1: string;
  @IsNotEmpty({ message: 'The password2 field cannot be empty.' })
  password2: string;
}
