import { UserEntity } from './../../domain/entity/UserEntity';
export class UserService{
  createUser(userEntity: UserEntity){
    console.log(userEntity);
    return userEntity;
  }
}