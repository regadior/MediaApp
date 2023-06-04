import { JwtService } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repository/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/user.entity';
import { UserRegisterController } from './api_rest/controller/user.register.controller';
import { CreateUserUseCase } from './application/use_case/create.user.use.case';
import { RestUserMapper } from './api_rest/mapper/rest.user.mapper';
import { UserMapper } from './infrastructure/mapper/UserMapper';
import { UserTypeOrmRepositoryImpl } from './infrastructure/repository/user.typeorm.repository.impl';
import { UserRolInitializer } from './infrastructure/initializer/user.rol.entity.initializer';
import { UserLoginController } from './api_rest/controller/user.login.controller';
import { LogUserUseCase } from './application/use_case/log.user.use.case';
import { UserRolEntity } from './infrastructure/entity/user.rol.entity';
import { UserRolRepository } from './domain/repository/user.rol.repository';
import { UserRolTypeOrmRepositoryImpl } from './infrastructure/repository/user.rol.typeorm.repository.impl';
import { UserRolMapper } from './infrastructure/mapper/user.rol.mapper';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
import { FindUserByIdUseCase } from './application/use_case/find.user.by.id.use.case';
import { GetUserForUserIdController } from './api_rest/controller/get.user.for.userid.controller';
import { PatchUserController } from './api_rest/controller/patch.user.by.userid.controller';
import { UpdateUserUseCase } from './application/use_case/update.user.usecase';
import { RestPatchUserMapper } from './api_rest/mapper/rest.patch.user.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRolEntity])],
  controllers: [UserRegisterController, UserLoginController, GetUserForUserIdController, PatchUserController],
  providers: [
    CreateUserUseCase,
    FindUserByIdUseCase,
    LogUserUseCase,
    UpdateUserUseCase,
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepositoryImpl,
    },
    {
      provide: UserRolRepository,
      useClass: UserRolTypeOrmRepositoryImpl,
    },
    RestUserMapper,
    UserMapper,
    UserRolMapper,
    RestPatchUserMapper,
    UserRolInitializer,
    TokenUtils,
    JwtService,
  ],
})
export class UserModule {}
