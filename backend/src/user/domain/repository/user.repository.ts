import { UserModel } from '../model/user.model';
export interface UserRepository {
  createUser(userMoldel: UserModel): Promise<UserModel | null>;
}
export const UserRepository = Symbol('UserRepository');
