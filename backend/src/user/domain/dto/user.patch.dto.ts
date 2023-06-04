import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserPatchDto {
  @IsOptional()
  @IsNotEmpty({ message: 'The username field cannot be empty.' })
  @IsString({ message: 'The username field must be a string.' })
  username: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The description field cannot be empty.' })
  @IsString({ message: 'The description field must be a string.' })
  description: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The imgPerfil field cannot be empty.' })
  @IsString({ message: 'The imgPerfil field must be a string.' })
  imgPerfil: string;

  @IsOptional()
  @IsNotEmpty({ message: 'The imgBanner field cannot be empty.' })
  @IsString({ message: 'The imgBanner field must be a string.' })
  imgBanner: string;
}
