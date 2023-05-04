import { UserRolEntity } from "./UserRolEntity";
export class UserEntity {
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
  userRol: UserRolEntity;
}