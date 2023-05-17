import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRolRepository } from 'src/user/domain/repository/user.rol.repository';
import { UserRolModel } from 'src/user/domain/model/user.rol.model';
import { UserRolEntity } from '../entity/user.rol.entity';
import { UserRolMapper } from '../mapper/user.rol.mapper';

@Injectable()
export class UserRolTypeOrmRepositoryImpl implements UserRolRepository {
  constructor(private readonly userRolMapper: UserRolMapper, @InjectRepository(UserRolEntity) private readonly userRolRepository: Repository<UserRolEntity>) {}
  async findOneByName(name: string): Promise<UserRolModel | null> {
    const userRol = await this.userRolRepository.findOne({ where: { name: name } });
    return userRol ? this.userRolMapper.UserRolEntityToUserRolModel(userRol) : null;
  }
}
