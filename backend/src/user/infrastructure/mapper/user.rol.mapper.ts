import { UserRolEntity } from '../entity/user.rol.entity';
import { UserRolModel } from 'src/user/domain/model/user.rol.model';
export class UserRolMapper {
  UserRolModelToUserRolEntity(userRolModel: UserRolModel): UserRolEntity {
    const userRolEntity = new UserRolEntity();
    userRolEntity.userRolId = userRolModel.userRolId;
    userRolEntity.name = userRolModel.name;
    userRolEntity.description = userRolModel.description;
    return userRolEntity;
  }
  UserRolEntityToUserRolModel(userRolEntity: UserRolEntity): UserRolModel {
    const userRolModel = new UserRolModel();
    userRolModel.userRolId = userRolEntity.userRolId;
    userRolModel.name = userRolEntity.name;
    userRolModel.description = userRolEntity.description;
    return userRolModel;
  }
}
