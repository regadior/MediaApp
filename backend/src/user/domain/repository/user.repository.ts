import { UserEntity } from './../../infrastructure/entity/user.entity';
import { UserModel } from '../model/user.model';

export interface UserRepository {
  findByUsername(username: string): Promise<UserModel | null>;
  findByEmail(email: string): Promise<UserModel | null>;
  // createUser(userEntity: UserEntity): Promise<UserModel | null>;
  responder(mensaje: string): Promise<string>;
}
export const UserRepository = Symbol('UserRepository');
