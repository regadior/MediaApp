import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { FindUserGameByIdAndUserIdUseCase } from 'src/game/application/use_case/find.user.game.by.id.and.userid.use.case';

@Controller('/api/games')
export class GetUserGameForUserController {
  constructor(private readonly findUserGameByIdAndUserIdUseCase: FindUserGameByIdAndUserIdUseCase) {}
  @Get('/:userGameId/user/:userId')
  @HttpCode(HttpStatus.OK)
  public async getGameForUser(@Param('userGameId') userGameId: number, @Param('userId') userId: number) {
    const userTarget = await this.findUserGameByIdAndUserIdUseCase.findUserGameByIdAndUserIdUseCase(userGameId, userId);
    return userTarget;
  }
}
