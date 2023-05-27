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
  async findOneGameUserByUserGameIdAndUserId(userGameId: number, userId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { userGameId: userGameId, userEntity: { userId } }, relations: ['userEntity'] });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async findOneGameUserByGameIdAndUserId(gameId: number, userId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { gameId: gameId, userEntity: { userId: userId } }, relations: ['userEntity'] });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async findOneGameUserByGameId(gameId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { gameId: gameId } });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async findOneGameUserByUserId(userId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { userEntity: { userId } } });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async findOneGameUserByUserGameId(userGameId: number): Promise<UserGameModel> {
    const gameUser = await this.userGameRepository.findOne({ where: { userGameId: userGameId }, relations: ['userEntity', 'gameState'] });
    return gameUser ? this.userGameMapper.UserGameEntityToUserGameModel(gameUser) : null;
  }
  async updateGameUser(userGameModel: UserGameModel) {
    const a = this.userGameMapper.UserGameEntityToUserGameModel(await this.userGameRepository.save(this.userGameMapper.UserGameModelToUserGameEntity(userGameModel)));
    return a;
  }
}
