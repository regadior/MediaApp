import { Controller, Get, HttpCode, HttpStatus, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindSaveGameByIdForUserUseCase } from 'src/game/application/use_case/find.savegame.by.id.for.user.usecase';

@Controller('/api/users')
export class GetGameSaveGameController {
  constructor(private readonly findSavegameByIdForUserUseCase: FindSaveGameByIdForUserUseCase) {}
  @Get('/:userId/games/:gameId/save-games/:saveGameId')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getGameSaveGame(@Param('userId') userId: number, @Param('gameId') gameId: number, @Param('saveGameId') saveGameId: number) {
    return await this.findSavegameByIdForUserUseCase.findSaveGameByIdForUser(userId, gameId, saveGameId);
  }
}
