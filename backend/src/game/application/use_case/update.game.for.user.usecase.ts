import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameModel } from './../../domain/model/user.game.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
@Injectable()
export class UpdateGameForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async UpdateGameForUserUseCase(userGameModel: UserGameModel, gameId: number, userId: number) {
    console.log(userGameModel);
    const existingUsername = await this.userRepository.findOneById(userId);
    if (existingUsername == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const userGameExists = this.userGameRepository.findOneGameUserByGameId(gameId);
    if (userGameExists == null) {
      userGameModel.gameId = gameId;
    }
  }
}
