import { Body, Controller, HttpCode, HttpStatus, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserGameSavegameDto } from 'src/game/domain/dto/user.game.savegame.dto';
import { CreateSavegameForUserGameUseCase } from 'src/game/application/use_case/create.savegame.for.usergame.usecase';
import { RestSaveGameMapper } from '../mapper/rest.save.game.mapper';
@Controller('/api/games')
export class PostUserGameSavegameForGameController {
  constructor(private readonly createSavegameForUserGameUseCase: CreateSavegameForUserGameUseCase, private readonly restSaveGameMapper: RestSaveGameMapper) {}
  @Post('/:gameId/users/:userId/save-games')
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async postGameForUser(@Body() userGameSavegameDto: UserGameSavegameDto, @Param('gameId') gameId: number, @Param('userId') userId: number) {
    await this.createSavegameForUserGameUseCase.createSavegameForUserGameUseCase(userId, gameId, this.restSaveGameMapper.userSavegameDtoToSaveGameModel(userGameSavegameDto));
  }
}
