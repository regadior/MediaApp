import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { RestGameUserMapper } from '../mapper/rest.game.user.mapper';
import { FavouriteGameDto } from 'src/game/domain/dto/favourite.game.dto';
import { CreateFavouriteGameForUserUseCase } from 'src/game/application/use_case/create.favourite.game.foruser.usecase';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
@Controller('/api/games')
export class PostFavouriteGameForUserController {
  constructor(
    private readonly createFavouriteGameForUserUseCase: CreateFavouriteGameForUserUseCase,
    private readonly restGameUserMapper: RestGameUserMapper,
    private readonly tokenUtils: TokenUtils,
  ) {}
  @Post('/:gameId/users/:userId')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async postGameForUser(
    @Body() favouriteGameDto: FavouriteGameDto,
    @Param('gameId') gameId: number,
    @Param('userId') userId: number,
    @Headers('Authorization') token: string,
  ) {
    await this.tokenUtils.verifyTokenByUserId(token, userId);
    await this.createFavouriteGameForUserUseCase.saveFavoutiteGameForUserUseCase(this.restGameUserMapper.favouriteGameDtoToUserGameModel(favouriteGameDto), gameId, userId);
  }
}
