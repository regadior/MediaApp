import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TicketModule } from './ticket/ticket.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/infrastructure/entity/user.entity';
import { UserRolEntity } from './user/infrastructure/entity/user.rol.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mediapp_dev',
      entities: [UserEntity, UserRolEntity],
      synchronize: true,
    }),
    TicketModule,
    UserModule,
  ],
})
export class AppModule {}
