import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/user.entity';
import { UserRegisterController } from './api_rest/controller/user.register.controller';
import { CreateUserUseCase } from './application/use_case/create.user.use.case';
import { RestUserMapper } from './api_rest/mapper/rest.user.mapper';
import { UserMapper } from './infrastructure/mapper/UserMapper';
import { UserTypeOrmRepositoryImpl } from './infrastructure/repository/user.typeorm.repository.impl';
import { UserRolEntity } from './infrastructure/entity/user.rol.entity';
import { UserRolInitializer } from './infrastructure/initializer/user.rol.entity.initializer';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRolEntity])],
  controllers: [UserRegisterController],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepositoryImpl,
    },
    RestUserMapper,
    UserMapper,
    UserRolInitializer,
  ],
})
export class UserModule {}
