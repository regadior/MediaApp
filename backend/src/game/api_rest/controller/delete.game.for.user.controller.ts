import { Controller, Delete, Headers, HttpCode, HttpStatus, Param, UsePipes, ValidationPipe } from '@nestjs/common';
import { FindUserGameByIdUseCase } from 'src/game/application/use_case/find.user.game.by.id.use.case';
import { RestPatchGameUserMapper } from '../mapper/rest.patch.game.user.mapper';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
import { DeleteGameForUserUseCase } from 'src/game/application/use_case/delete.game.for.user.usecase';
@Controller('/api/users')
export class DeleteGameForUserController {
  constructor(
    private readonly deleteGameForUserUseCase: DeleteGameForUserUseCase,
    private readonly restPatchGameUserMapper: RestPatchGameUserMapper,
    private readonly findUserGameByIdUseCase: FindUserGameByIdUseCase,
    private readonly tokenUtils: TokenUtils,
  ) {}
  @Delete('/:userId/games/:gameId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async patchGameForUser(@Param('gameId') gameId: number, @Param('userId') userId: number, @Headers('Authorization') token: string) {
    await this.tokenUtils.verifyTokenByUserId(token, userId);
    this.deleteGameForUserUseCase.deleteGameForUserUseCase(userId, gameId);
  }
}
