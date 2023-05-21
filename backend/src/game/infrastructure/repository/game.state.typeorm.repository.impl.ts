import { GameStateRepository } from './../../domain/repository/game.state.repository';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GameStateEntity } from '../entity/game.state.entity';
import { GameStateModel } from 'src/game/domain/model/game.state.model';
import { GameStateMapper } from '../mapper/game.state.mapper';

@Injectable()
export class GameStateTypeOrmRepositoryImpl implements GameStateRepository {
  constructor(private readonly gameStateMapper: GameStateMapper, @InjectRepository(GameStateEntity) private readonly gameStateRepository: Repository<GameStateEntity>) {}
  async findOneByState(state: string): Promise<GameStateModel | null> {
    const gameState = await this.gameStateRepository.findOne({ where: { state: state } });
    return gameState ? this.gameStateMapper.GameStateEntityToGameStateModel(gameState) : null;
  }
}
