import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  username: string;
  @IsNotEmpty({ message: 'The password field cannot be empty.' })
  password: string;
}
