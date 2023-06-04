import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from './../../domain/model/user.game.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';
import { UserGameExistsException } from 'src/game/domain/exception/user.game.exists.exception';
@Injectable()
export class CreateFavouriteGameForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(GameStateRepository)
    private readonly gameStateRepository: GameStateRepository,
  ) {}
  public async saveFavoutiteGameForUserUseCase(userGameModel: UserGameModel, gameId: number, userId: number) {
    const existingUsername = await this.userRepository.findOneById(userId);
    if (existingUsername == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    //TODO añadir comprobacion de juego
    const existingUserGame = await this.userGameRepository.findOneGameUserByGameIdAndUserId(gameId, userId);
    if (existingUserGame != null) {
      throw new UserGameExistsException(`Game with id ${gameId} for user with id ${userId} is currently in favorites`);
    }
    if (userGameModel.gameState == null || userGameModel.gameState.state == null) {
      const stateDef = await this.gameStateRepository.findOneByState('uncategorized');
      userGameModel.gameState = stateDef;
    }
    userGameModel.gameId = gameId;
    userGameModel.userModel = existingUsername;
    userGameModel.score = 0;
    this.userGameRepository.updateGameUser(userGameModel);
  }
}
