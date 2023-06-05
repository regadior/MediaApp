import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { GetGameViewService } from 'src/game/infrastructure/service/rawg/get.game.view.service';
@Controller('/api')
export class RawgGameViewController {
  constructor(private readonly getGameViewService: GetGameViewService) {}
  @Get('/users/:userId?/games/:name')
  @HttpCode(HttpStatus.OK)
  public async getGameView(@Param('name') name: string, @Param('userId') userId?: number) {
    (userId);
    try {
      const game = await this.getGameViewService.gameDetails(name, userId);
      return game;
    } catch (error) {
      console.error('Error:', error);
      return 'Error occurred while fetching game details.';
    }
  }
}
