import { Inject, Injectable } from '@nestjs/common';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UserRepository } from 'src/user/domain/repository/user.repository';
@Injectable()
export class FindUserGameByIdAndUserIdUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async findUserGameByIdAndUserIdUseCase(userGameId: number, userId: number) {
    const userDb = await this.userRepository.findOneById(userId);
    if (userDb == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const userGameDb = await this.userGameRepository.findOneGameUserByUserGameId(userGameId);
    if (userGameDb == null) {
      throw new UserGameNotFoundException(`UserGame with id ${userGameId} does not exists`);
    }
    return userGameDb;
  }
}
