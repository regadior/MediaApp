import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from './../../domain/model/user.game.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
@Injectable()
export class DeleteGameForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(GameStateRepository)
    private readonly gameStateRepository: GameStateRepository,
  ) {}
  public async deleteGameForUserUseCase(userId: number, gameId: number) {
    const userDb = await this.userRepository.findOneById(userId);
    if (userDb == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const userGameDb = await this.userGameRepository.findOneGameUserByGameIdAndUserId(gameId, userId);
    if (userGameDb == null) {
      throw new UserGameNotFoundException(`UserGame with user id ${userId} and game id ${gameId} does not exists`);
    }
    this.userGameRepository.delete(userGameDb);
  }
}
