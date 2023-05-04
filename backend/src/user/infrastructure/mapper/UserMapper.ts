import { Mapper } from "ts-mapstruct";
import { User } from "../orm/User";
import { UserEntity } from "../../domain/entity/UserEntity";
@Mapper()
export class UserMapper{
  toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    Object.assign(userEntity, user);
    return userEntity;
  }
  toOrm(userEntity: UserEntity): User {
    const user = new User();
    Object.assign(user, userEntity);
    return user;
  }
}