import { Inject, Injectable } from '@nestjs/common';
import { UserGameSavegameModel } from './../../domain/model/user.game.savegame.model';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';
import { UserGameStateNotFoundException } from 'src/game/domain/exception/user.game.state.notfound.exception';
import { UserGameSavegameRepository } from 'src/game/domain/repository/user.game.savegame.repository';
@Injectable()
export class CreateSavegameForUserGameUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(UserGameSavegameRepository)
    private readonly userGameSavegameRepository: UserGameSavegameRepository,
    @Inject(GameStateRepository)
    private readonly gameStateRepository: GameStateRepository,
  ) {}
  public async createSavegameForUserGameUseCase(userId: number, userGameId: number, userGameSavegameModel: UserGameSavegameModel) {
    const userDb = await this.userRepository.findOneById(userId);
    if (userDb == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const gameStateDb = await this.gameStateRepository.findOneByState(userGameSavegameModel.state.state);
    if (gameStateDb == null) {
      throw new UserGameStateNotFoundException(`State with name ${userGameSavegameModel.state.state} does not exists`);
    }
    userGameSavegameModel.state = gameStateDb;
    const userGameDb = await this.userGameRepository.findOneGameUserByUserGameId(userGameId);
    if (userGameDb == null) {
      throw new UserGameNotFoundException(`UserGame with id ${userGameId} does not exists`);
    }
    userGameSavegameModel.userGame = userGameDb;
    // userGameDb.userGameSavegames = [userGameSavegameModel];
    this.userGameSavegameRepository.create(userGameSavegameModel);
  }
}
