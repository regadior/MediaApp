import { Inject, Injectable } from '@nestjs/common';
import { UserGameNotFoundException } from 'src/game/domain/exception/user.game.notfound.exception';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';
import { UserGameSavegameRepository } from 'src/game/domain/repository/user.game.savegame.repository';
import { GetGameByIdService } from 'src/game/infrastructure/service/rawg/get.game.by.id.service';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UserRepository } from 'src/user/domain/repository/user.repository';
@Injectable()
export class FindWhishlistGameForUserUseCase {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(UserGameSavegameRepository)
    private readonly userGameSavegameRepository: UserGameSavegameRepository,
    private readonly getGameByIdService: GetGameByIdService,
  ) {}
  public async findWhishlistGameForUserById(userId: number) {
    const userDb = await this.userRepository.findOneById(userId);
    if (userDb == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const gameWishlistDb = await this.userGameRepository.findAllByWhishlistTrueAndUserId(userId);
    if (userDb == null) {
      throw new UserGameNotFoundException(`No games added in the list`);
    }
    const gameDetails = [];
    for (const game of gameWishlistDb) {
      const gameDetail = await this.getGameByIdService.gameGameById(game.gameId);
      gameDetails.push(gameDetail);
    }
    const response = {
      whishlistGames: gameDetails,
    };
    return response;
  }
}
