import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from './../../domain/model/user.game.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
@Injectable()
export class UpdateGameForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(GameStateRepository)
    private readonly gameStateRepository: GameStateRepository,
  ) {}
  public async UpdateGameForUserUseCase(userGameModel: UserGameModel, userGameId: number) {
    console.log(userGameModel);
    const userGameExists = await this.userGameRepository.findOneGameUserByUserGameId(userGameId);
    if (userGameExists == null) {
      throw new UserGameNotFoundException(`UserGame with id ${userGameId} does not exists`);
    }
    if (userGameModel.gameState.state == null) {
      const stateDef = await this.gameStateRepository.findOneByState('uncategorized');
      userGameModel.gameState = stateDef;
    }
    const state = await this.gameStateRepository.findOneByState(`${userGameModel.gameState.state}`);
    console.log(state);
    userGameModel.gameState = state;
    console.log(userGameModel);
    this.userGameRepository.updateGameUser(userGameModel);
  }
}
