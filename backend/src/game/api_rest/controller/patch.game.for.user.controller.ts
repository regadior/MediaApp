import { Body, Controller, HttpCode, HttpStatus, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateGameForUserUseCase } from 'src/game/application/use_case/update.game.for.user.usecase';
import { FindUserGameByIdUseCase } from 'src/game/application/use_case/find.user.game.by.id.use.case';
import { UserGamePatchDto } from 'src/game/domain/dto/request/user.game.patch.dto';
import { RestPatchGameUserMapper } from '../mapper/rest.patch.game.user.mapper';
@Controller('/api/games')
export class PatchGameForUserController {
  constructor(
    private readonly updateGameForUserUseCase: UpdateGameForUserUseCase,
    private readonly restPatchGameUserMapper: RestPatchGameUserMapper,
    private readonly findUserGameByIdUseCase: FindUserGameByIdUseCase,
  ) {}
  @Patch('/:userGameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async patchGameForUser(@Body() userGamePatchDto: UserGamePatchDto, @Param('userGameId') userGameId: number) {
    const userTarget = await this.findUserGameByIdUseCase.findUserGameByIdUseCase(userGameId);
    this.updateGameForUserUseCase.UpdateGameForUserUseCase(this.restPatchGameUserMapper.patchUserGameDtoToUserGameModel(userGamePatchDto, userTarget), userGameId);
  }
}
