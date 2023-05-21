import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { UserGameEntity } from '../entity/user.game.entity';
import { UserGameMapper } from '../mapper/user.game.mapper';

@Injectable()
export class UserGameTypeOrmRepositoryImpl implements UserGameRepository {
  constructor(private readonly userGameMapper: UserGameMapper, @InjectRepository(UserGameEntity) private readonly userGameRepository: Repository<UserGameEntity>) {}
  async findOneGameUserByGameId(gameId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { gameId: gameId } });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async findOneGameUserByUserId(userId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { userEntity: { userId } } });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async updateGameUser(userGameModel: UserGameModel) {
    throw new Error('Method not implemented.');
  }
}
