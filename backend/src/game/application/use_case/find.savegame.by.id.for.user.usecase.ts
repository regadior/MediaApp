import { Inject, Injectable } from '@nestjs/common';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameSavegameRepository } from 'src/game/domain/repository/user.game.savegame.repository';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UserRepository } from 'src/user/domain/repository/user.repository';
@Injectable()
export class FindSaveGameByIdForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(UserGameSavegameRepository)
    private readonly userGameSavegameRepository: UserGameSavegameRepository,
  ) {}
  public async findSaveGameByIdForUser(userId: number, gameId: number, saveGameId: number) {
    const userDb = await this.userRepository.findOneById(userId);
    if (userDb == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const userGameDb = await this.userGameRepository.findOneGameUserByUserGameId(gameId);
    if (userGameDb == null) {
      throw new UserGameNotFoundException(`UserGame with id ${gameId} does not exists`);
    }
    return this.userGameSavegameRepository.findOneBySaveGameId(saveGameId);
  }
}
