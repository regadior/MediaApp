import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  name: string;
  @IsNotEmpty({ message: 'The surenames field cannot be empty.' })
  surenames: string;
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'The password field cannot be empty.' })
  password: string;
}
