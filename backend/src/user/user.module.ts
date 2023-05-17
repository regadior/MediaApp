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
import { APP_FILTER } from '@nestjs/core';
import { ConflictExceptionFilter } from './api_rest/exception/conflict.exception.handler';
import { NotFoundExceptionFilter } from './api_rest/exception/notfound.exception.handler';
import { BadRequestExceptionFilter } from './api_rest/exception/badrequest.exception.handler';
import { UserRolEntity } from './infrastructure/entity/user.rol.entity';
import { UserRolRepository } from './domain/repository/user.rol.repository';
import { UserRolTypeOrmRepositoryImpl } from './infrastructure/repository/user.rol.typeorm.repository.impl';
import { UserRolMapper } from './infrastructure/mapper/user.rol.mapper';
@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserRolEntity])],
  controllers: [UserRegisterController, UserLoginController],
  providers: [
    CreateUserUseCase,
    LogUserUseCase,
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
    UserRolInitializer,
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: ConflictExceptionFilter, //Filter type (exceptions)
    },
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: NotFoundExceptionFilter, //Filter type (exceptions)
    },
    {
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: BadRequestExceptionFilter, //Filter type (exceptions)
    },
  ],
})
export class UserModule {}
