import { RestUserMapper } from 'src/user/api_rest/mapper/rest.user.mapper';
import { UserRegisterDto } from 'src/user/domain/dto/user.register.dto';
import { CreateUserUseCase } from './../../application/use_case/create.user.use.case';
import { Body, Controller, HttpCode, HttpStatus, Post, UseFilters } from '@nestjs/common';
import { UserBasicResponseDto } from 'src/user/domain/dto/user.basic.dto';
@Controller('/api/auth')
export class UserRegisterController {
  constructor(private readonly createUserUseCase: CreateUserUseCase, private readonly restUserMapper: RestUserMapper) {}
  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  public async register(@Body() userRegisterDto: UserRegisterDto): Promise<UserBasicResponseDto> {
    return this.restUserMapper.UserModelToUserBasicResponseDto(await this.createUserUseCase.createUser(this.restUserMapper.registerDtoToUserModel(userRegisterDto)));
  }
}
