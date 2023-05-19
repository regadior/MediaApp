import { Module } from '@nestjs/common';
import { RawgGameListController } from './api_rest/get.rawg.game.list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([])],
  controllers: [RawgGameListController],
  providers: [],
})
export class GameModule {}
