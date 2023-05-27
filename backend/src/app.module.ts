import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/infrastructure/entity/user.entity';
import { UserRolEntity } from './user/infrastructure/entity/user.rol.entity';
import { AuthModule } from './auth/auth.module';
import { GameModule } from './game/game.module';
import { UserGameEntity } from './game/infrastructure/entity/user.game.entity';
import { UserGameSavegameEntity } from './game/infrastructure/entity/user.game.savegame.entity';
import { GameStateEntity } from './game/infrastructure/entity/game.state.entity';
import { ErrorHandlerModule } from './error_handler/error_handler.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '1234',
      database: 'mediapp_dev',
      entities: [UserEntity, UserRolEntity, UserGameEntity, UserGameSavegameEntity, GameStateEntity],
      synchronize: true,
    }),
    GameModule,
    UserModule,
    AuthModule,
    ErrorHandlerModule,
  ],
})
export class AppModule {}
