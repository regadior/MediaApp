import { RestUserMapper } from 'src/user/api_rest/mapper/rest.user.mapper';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { UserBasicResponseDto } from 'src/user/domain/dto/user.basic.dto';
import { LogUserUseCase } from 'src/user/application/use_case/log.user.use.case';
import { UserLoginDto } from 'src/user/domain/dto/user.login.dto';
@Controller('/api/auth')
export class UserLoginController {
  constructor(private readonly logUserUseCase: LogUserUseCase, private readonly restUserMapper: RestUserMapper) {}
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() userLoginDto: UserLoginDto): Promise<UserBasicResponseDto> {
    return this.restUserMapper.UserModelToUserBasicResponseDto(await this.logUserUseCase.logUser(this.restUserMapper.UserLoginDtoToUserModel(userLoginDto)));
  }
}
