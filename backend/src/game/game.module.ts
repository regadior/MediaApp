import { Module } from '@nestjs/common';
import { RawgGameListController } from './api_rest/get.rawg.game.list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameEntity } from './infrastructure/entity/user.game.entity';
import { UserGameSavegameEntity } from './infrastructure/entity/user.game.savegame.entity';
import { GameStateEntity } from './infrastructure/entity/game.state.entity';
import { GameStateTypeOrmRepositoryImpl } from './infrastructure/repository/game.state.typeorm.repository.impl';
import { GameStateRepository } from './domain/repository/game.state.repository';
import { UserGameStateInitializer } from './infrastructure/initializer/game.state.entity.initializer';
import { GameStateMapper } from './infrastructure/mapper/game.state.mapper';

@Module({
  imports: [TypeOrmModule.forFeature([UserGameEntity, UserGameSavegameEntity, GameStateEntity])],
  controllers: [RawgGameListController],
  providers: [
    UserGameStateInitializer,
    GameStateMapper,
    {
      provide: GameStateRepository,
      useClass: GameStateTypeOrmRepositoryImpl,
    },
  ],
})
export class GameModule {}
