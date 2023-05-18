import { UserRolModel } from './user.rol.model';

export class UserModel {
  userId: number;
  name: string;
  surenames: string;
  username: string;
  email: string;
  password: string;
  description: string;
  imgPerfil: string;
  imgBanner: string;
  createdAt: Date;
  updatedAt: Date;
  accessToken: string;
  rol: UserRolModel;
}
