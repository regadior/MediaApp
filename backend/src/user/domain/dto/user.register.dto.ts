import { Equals, IsEmail, IsNotEmpty } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty({ message: 'The name field cannot be empty.' })
  name: string;
  @IsNotEmpty({ message: 'The surenames field cannot be empty.' })
  surenames: string;
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  username: string;
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'The password1 field cannot be empty.' })
  password1: string;
  @IsNotEmpty({ message: 'The password2 field cannot be empty.' })
  @Equals('password1', { message: 'The passwords do not match.' })
  password2: string;
}
