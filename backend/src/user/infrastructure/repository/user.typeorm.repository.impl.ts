import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mapper/UserMapper';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class UserTypeOrmRepositoryImpl implements UserRepository {
  constructor(private readonly userMapper: UserMapper) {}
  async createUser(userModel: UserModel): Promise<UserModel | null> {
    return this.userMapper.UserEntityToUserModel(await this.userMapper.UserModelToUserEntity(userModel).save());
  }
}
