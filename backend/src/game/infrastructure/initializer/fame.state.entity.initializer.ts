// import { UserRolEntity } from 'src/user/infrastructure/entity/user.rol.entity';
// import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
// import { UserRolRepository } from 'src/user/domain/repository/user.rol.repository';

// @Injectable()
// export class UserRolInitializer implements OnModuleInit {
  // constructor(
  //   @Inject(UserRolRepository)
  //   private readonly userRolRepository: UserRolRepository,
  // ) {}
  // async onModuleInit() {
  //   await this.createDefaultUserRoles();
  // }
  // async createDefaultUserRoles() {
  //   //Initialize rol User
  //   const rol1 = await this.userRolRepository.findOneByName('user');
  //   if (rol1 == null) {
  //     const userRolEntity1 = new UserRolEntity();
  //     userRolEntity1.userRolId = 0;
  //     userRolEntity1.name = 'user';
  //     userRolEntity1.description = 'Normal User';
  //     userRolEntity1.save();
  //   }
  //   //Initialize rol Admin
  //   const rol2 = await this.userRolRepository.findOneByName('admin');
  //   if (rol2 == null) {
  //     const userRolEntity2 = new UserRolEntity();
  //     userRolEntity2.userRolId = 0;
  //     userRolEntity2.name = 'admin';
  //     userRolEntity2.description = 'User with all permissions';
  //     userRolEntity2.save();
  //   }
  // }
// }
