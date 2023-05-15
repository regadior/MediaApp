import { UserRolModel } from '../model/user.rol.model';

export class UserRegisterResponseDto {
  userId: number;
  name: string;
  surenames: string;
  username: string;
  email: string;
  rol: UserRolModel;
}
