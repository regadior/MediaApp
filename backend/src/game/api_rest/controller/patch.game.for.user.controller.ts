import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserGameDto } from 'src/game/domain/dto/user.game.dto';
import { UpdateGameForUserUseCase } from 'src/game/application/use_case/update.game.for.user.usecase';
import { RestGameUserMapper } from '../mapper/rest.game.user.mapper';
@Controller('/api/games')
export class PatchGameForUserController {
  constructor(private readonly updateGameForUserUseCase: UpdateGameForUserUseCase, private readonly restGameUserMapper: RestGameUserMapper) {}
  @Patch('/:gameId/users/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async patchGameForUser(@Body() userGameDto: UserGameDto, @Param('gameId') gameId: number, @Param('userId') userId: number) {
    console.log(gameId, userId);
    this.updateGameForUserUseCase.UpdateGameForUserUseCase(this.restGameUserMapper.UserGameDtoToUserGameModel(userGameDto), gameId, userId);
  }
}
