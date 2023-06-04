import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserGameSavegameDto } from 'src/game/domain/dto/user.game.savegame.dto';
import { CreateSavegameForUserGameUseCase } from 'src/game/application/use_case/create.savegame.for.usergame.usecase';
import { RestSaveGameMapper } from '../mapper/rest.save.game.mapper';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
@Controller('/api/games')
export class PostUserGameSavegameForGameController {
  constructor(
    private readonly createSavegameForUserGameUseCase: CreateSavegameForUserGameUseCase,
    private readonly restSaveGameMapper: RestSaveGameMapper,
    private readonly tokenUtils: TokenUtils,
  ) {}
  @Post('/:gameId/users/:userId/save-games')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async postGameForUser(
    @Body() userGameSavegameDto: UserGameSavegameDto,
    @Param('gameId') gameId: number,
    @Param('userId') userId: number,
    @Headers('Authorization') token: string,
  ) {
    await this.tokenUtils.verifyTokenByUserId(token, userId);
    await this.createSavegameForUserGameUseCase.createSavegameForUserGameUseCase(userId, gameId, this.restSaveGameMapper.userSavegameDtoToSaveGameModel(userGameSavegameDto));
  }
}
