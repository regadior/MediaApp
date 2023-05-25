import { Inject, Injectable } from '@nestjs/common';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
@Injectable()
export class FindUserGameByIdUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
  ) {}
  public async findUserGameByIdUseCase(userGameId: number) {
    const userGameDb = await this.userGameRepository.findOneGameUserByUserGameId(userGameId);
    if (userGameDb == null) {
      throw new UserGameNotFoundException(`UserGame with id ${userGameId} does not exists`);
    }
    return userGameDb;
  }
}
