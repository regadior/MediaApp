import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mapper/UserMapper';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class UserTypeOrmRepositoryImpl implements UserRepository {
  constructor(private readonly userMapper: UserMapper) {}

  async createUser(userModel: UserModel): Promise<UserModel | null> {
    console.log('Entra en el create de repo', userModel);
    const userEntity = await this.userMapper.UserModelToUserEntity(userModel);
    await userEntity.save();
    console.log('La Entidad guardada', userEntity);
    return this.userMapper.UserEntityToUserModel(userEntity);
  }
}
