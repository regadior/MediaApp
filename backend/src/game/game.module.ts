import { Module } from '@nestjs/common';
import { RawgGameListController } from './api_rest/get.rawg.game.list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameEntity } from './infrastructure/entity/user.game.entity';
import { UserGameSavegameEntity } from './infrastructure/entity/user.game.savegame';
import { GameStateEntity } from './infrastructure/entity/game.state.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserGameEntity, UserGameSavegameEntity, GameStateEntity])],
  controllers: [RawgGameListController],
  providers: [],
})
export class GameModule {}
