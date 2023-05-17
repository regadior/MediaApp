import { UserRolModel } from '../model/user.rol.model';
export interface UserRolRepository {
  findOneByName(name: string): Promise<UserRolModel | null>;
}
export const UserRolRepository = Symbol('UserRolRepository');
