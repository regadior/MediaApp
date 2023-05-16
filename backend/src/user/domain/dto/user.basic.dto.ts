import { UserRolResponseDto } from './user.rol.response.dto';
export class UserBasicResponseDto {
  userId: number;
  name: string;
  surenames: string;
  username: string;
  email: string;
  rol: UserRolResponseDto;
}
