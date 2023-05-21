import { UserModel } from '../model/user.model';
export interface UserRepository {
  createUser(userMoldel: UserModel): Promise<UserModel | null>;
  findOneByUsername(username: string): Promise<UserModel | null>;
  findOneByEmail(email: string): Promise<UserModel | null>;
  findOneById(userId: number): Promise<UserModel | null>;
}
export const UserRepository = Symbol('UserRepository');
