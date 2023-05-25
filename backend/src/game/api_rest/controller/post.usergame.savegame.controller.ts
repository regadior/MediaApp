import { Body, Controller, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestGameUserMapper } from '../mapper/rest.game.user.mapper';
import { CreateFavouriteGameForUserUseCase } from 'src/game/application/use_case/create.favourite.game.foruser.usecase';
import { UserGameSavegameDto } from 'src/game/domain/dto/user.game.savegame.dto';
@Controller('/api/games')
export class PostUserGameSavegameForGameController {
  constructor(private readonly createFavouriteGameForUserUseCase: CreateFavouriteGameForUserUseCase, private readonly restGameUserMapper: RestGameUserMapper) {}
  @Post('/:gameId/users/:userId/save-games')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async postGameForUser(@Body() userGameSavegameDto: UserGameSavegameDto, @Param('gameId') gameId: number, @Param('userId') userId: number) {
    console.log(gameId, userId);
    // this.createFavouriteGameForUserUseCase.saveFavoutiteGameForUserUseCase(this.restGameUserMapper.favouriteGameDtoToUserGameModel(favouriteGameDto), gameId, userId);
  }
}
