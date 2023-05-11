import { Module } from '@nestjs/common';
import { UserRepository } from './domain/repository/user.repository';
import { UserTypeormRepository } from './infrastructure/repository/user.typeorm.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './infrastructure/entity/user.entity';
import { UserRegisterController } from './api_rest/controller/user.register.controller';
import { CreateUserUseCase } from './application/use_case/create.user.use.case';
import { RestUserMapper } from './application/mapper/rest.user.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserRegisterController],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: UserTypeormRepository,
    },
    RestUserMapper,
  ],
})
export class UserModule {}
