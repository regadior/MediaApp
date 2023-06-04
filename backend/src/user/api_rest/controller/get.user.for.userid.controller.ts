import { Controller, Get, HttpCode, HttpStatus, Param } from '@nestjs/common';
import { FindUserByIdUseCase } from 'src/user/application/use_case/find.user.by.id.use.case';

@Controller('/api/users')
export class GetUserForUserIdController {
  constructor(private readonly findUserByIdUseCase: FindUserByIdUseCase) {}
  @Get('/:userId')
  @HttpCode(HttpStatus.OK)
  public async getGameForUser(@Param('userId') userId: number) {
    const userTarget = await this.findUserByIdUseCase.findUserByUserId(userId);
    delete userTarget.password;
    return userTarget;
  }
}
