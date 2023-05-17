import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRolEntity } from '../entity/user.rol.entity';
import { UserRolModel } from 'src/user/domain/model/user.rol.model';
export class UserMapper {
  UserModelToUserEntity(userModel: UserModel): UserEntity {
    const userEntity = new UserEntity();
    userEntity.userId = userModel.userId;
    userEntity.name = userModel.name;
    userEntity.surenames = userModel.surenames;
    userEntity.username = userModel.username;
    userEntity.email = userModel.email;
    userEntity.password = userModel.password1;
    userEntity.description = userModel.description;
    userEntity.imgPerfil = userModel.imgPerfil;
    userEntity.imgBanner = userModel.imgBanner;
    // Convert role object from UserModel to UserRolEntity
    const userRolEntity = new UserRolEntity();
    userRolEntity.userRolId = userModel.rol.userRolId;
    userRolEntity.name = userModel.rol.name;
    userRolEntity.description = userModel.rol.description;
    userEntity.rol = userRolEntity;
    return userEntity;
  }
  UserEntityToUserModel(userEntity: UserEntity): UserModel {
    const userModel = new UserModel();
    userModel.userId = userEntity.userId;
    userModel.name = userEntity.name;
    userModel.surenames = userEntity.surenames;
    userModel.username = userEntity.username;
    userModel.email = userEntity.email;
    userModel.password1 = userEntity.password;
    userModel.description = userEntity.description;
    userModel.imgPerfil = userEntity.imgPerfil;
    userModel.imgBanner = userEntity.imgBanner;
    userModel.createdAt = userEntity.createdAt;
    userModel.updatedAt = userEntity.updatedAt;
    // Assign values to userModel.rol properties
    const userRolModel = new UserRolModel();
    userRolModel.userRolId = userEntity.rol.userRolId;
    userRolModel.name = userEntity.rol.name;
    userRolModel.description = userEntity.rol.description;
    userModel.rol = userRolModel;
    return userModel;
  }
}
