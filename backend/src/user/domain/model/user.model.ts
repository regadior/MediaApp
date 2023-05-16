import { UserRolModel } from './user.rol.model';

export class UserModel {
  userId: number;
  name: string;
  surenames: string;
  username: string;
  email: string;
  password1: string;
  password2: string;
  description: string;
  imgPerfil: string;
  imgBanner: string;
  createdAt: Date;
  updatedAt: Date;
  rol: UserRolModel;
}
