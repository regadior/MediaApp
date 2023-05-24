import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from './../../domain/model/user.game.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';
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
  public async UpdateGameForUserUseCase(userGameModel: UserGameModel, gameId: number, userId: number) {
    const existingUsername = await this.userRepository.findOneById(userId);
    if (existingUsername == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const userGameExists = await this.userGameRepository.findOneGameUserByGameId(gameId);
    console.log(userGameExists);
    if (userGameExists == null) {
      userGameModel.gameId = gameId;
    }
    if (userGameModel.gameState.state == null) {
      const stateDef = await this.gameStateRepository.findOneByState('uncategorized');
      userGameModel.gameState = stateDef;
    }
    userGameModel.userModel = existingUsername;
    console.log(userGameModel);
  }
}
