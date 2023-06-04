import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { UpdateGameForUserUseCase } from 'src/game/application/use_case/update.game.for.user.usecase';
import { FindUserGameByIdUseCase } from 'src/game/application/use_case/find.user.game.by.id.use.case';
import { UserGamePatchDto } from 'src/game/domain/dto/request/user.game.patch.dto';
import { RestPatchGameUserMapper } from '../mapper/rest.patch.game.user.mapper';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
@Controller('/api/users')
export class PatchGameForUserController {
  constructor(
    private readonly updateGameForUserUseCase: UpdateGameForUserUseCase,
    private readonly restPatchGameUserMapper: RestPatchGameUserMapper,
    private readonly findUserGameByIdUseCase: FindUserGameByIdUseCase,
    private readonly tokenUtils: TokenUtils,
  ) {}
  @Patch('/:userId/games/:userGameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async patchGameForUser(
    @Body() userGamePatchDto: UserGamePatchDto,
    @Param('userGameId') userGameId: number,
    @Param('userId') userId: number,
    @Headers('Authorization') token: string,
  ) {
    await this.tokenUtils.verifyTokenByUserId(token, userId);
    const userTarget = await this.findUserGameByIdUseCase.findUserGameByIdUseCase(userGameId);
    this.updateGameForUserUseCase.UpdateGameForUserUseCase(this.restPatchGameUserMapper.patchUserGameDtoToUserGameModel(userGamePatchDto, userTarget), userGameId);
  }
}
