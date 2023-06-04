import { Body, Controller, Headers, HttpCode, HttpStatus, Param, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
import { TokenUtils } from 'src/auth/application/use_case/token.utils';
import { UserPatchDto } from 'src/user/domain/dto/user.patch.dto';
import { RestPatchUserMapper } from '../mapper/rest.patch.user.mapper';
import { FindUserByIdUseCase } from 'src/user/application/use_case/find.user.by.id.use.case';
import { UpdateUserUseCase } from 'src/user/application/use_case/update.user.usecase';
@Controller('/api/users')
export class PatchUserController {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly restPatchUserMapper: RestPatchUserMapper,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly tokenUtils: TokenUtils,
  ) {}
  @Patch('/:userId')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UsePipes(new ValidationPipe({ transform: true }))
  public async patchUserForUser(@Body() userPatchDto: UserPatchDto, @Param('userId') userId: number, @Headers('Authorization') token: string) {
    await this.tokenUtils.verifyTokenByUserId(token, userId);
    const userTarget = await this.findUserByIdUseCase.findUserByUserId(userId);
    await this.updateUserUseCase.UpdateUserUseCase(this.restPatchUserMapper.patchUserDtoToUserModel(userPatchDto, userTarget), userId);
  }
}
