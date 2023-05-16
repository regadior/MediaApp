import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mapper/UserMapper';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserTypeOrmRepositoryImpl implements UserRepository {
  constructor(private readonly userMapper: UserMapper, @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
  async createUser(userModel: UserModel): Promise<UserModel | null> {
    return this.userMapper.UserEntityToUserModel(await this.userMapper.UserModelToUserEntity(userModel).save());
  }
  async findOneByUsername(username: string): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({ where: { username: username }, relations: ['rol'] });
    return user ? this.userMapper.UserEntityToUserModel(user) : null;
  }
  async findOneByEmail(email: string): Promise<UserModel | null> {
    const user = await this.userRepository.findOne({ where: { email: email }, relations: ['rol'] });
    return user ? this.userMapper.UserEntityToUserModel(user) : null;
  }
}
