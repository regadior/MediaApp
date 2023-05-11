import { UserRolEntity } from 'src/user/infrastructure/entity/user.rol.entity';

export class UserRegisterResponseDto {
  userId: number;
  name: string;
  surenames: string;
  username: string;
  email: string;
  rol: UserRolEntity;
}
