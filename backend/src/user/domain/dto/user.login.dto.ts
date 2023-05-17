import { Equals, IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  username: string;
  @IsNotEmpty({ message: 'The password1 field cannot be empty.' })
  password1: string;
  @IsNotEmpty({ message: 'The password2 field cannot be empty.' })
  @Equals('password1', { message: 'The passwords do not match.' })
  password2: string;
}
