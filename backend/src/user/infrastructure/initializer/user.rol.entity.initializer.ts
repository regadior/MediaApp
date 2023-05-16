import { UserRolEntity } from 'src/user/infrastructure/entity/user.rol.entity';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class UserRolInitializer implements OnModuleInit {
  async onModuleInit() {
    await this.createDefaultUserRoles();
  }
  async createDefaultUserRoles() {
    const userRolEntity1 = new UserRolEntity();
    userRolEntity1.userRolId = 0;
    userRolEntity1.name = 'user';
    userRolEntity1.description = 'Normal User';
    console.log(userRolEntity1);
    userRolEntity1.save();
    const userRolEntity2 = new UserRolEntity();
    userRolEntity2.userRolId = 0;
    userRolEntity2.name = 'admin';
    userRolEntity2.description = 'User with all permissions';
    console.log(userRolEntity2);
    userRolEntity2.save();
  }
}
