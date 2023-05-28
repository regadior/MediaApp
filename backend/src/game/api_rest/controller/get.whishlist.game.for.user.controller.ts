import { Controller, Get, HttpCode, HttpStatus, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindWhishlistGameForUserUseCase } from 'src/game/application/use_case/find.whishlist.games.foruser.usecase';

@Controller('/api/users')
export class GetWhishlistGameForUserController {
  constructor(private readonly findWhishlistGameForUserUseCase: FindWhishlistGameForUserUseCase) {}
  @Get('/:userId/favourite-games')
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async getWhishlistGame(@Param('userId') userId: number) {
    return await this.findWhishlistGameForUserUseCase.findWhishlistGameForUserById(userId);
  }
}
