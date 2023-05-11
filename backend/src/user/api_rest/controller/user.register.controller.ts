import { UserRegisterDto } from 'src/user/application/dto/user.register.dto';
import { CreateUserUseCase } from './../../application/use_case/create.user.use.case';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('/api/auth')
export class UserRegisterController {
  constructor(private createUserUseCase: CreateUserUseCase) {}
  @Post('/register')
  public async register(@Body() userRegisterDto: UserRegisterDto): Promise<string> {
    console.log(userRegisterDto);
    // await this.createUserUseCase.createUser();
    return this.createUserUseCase.createUser(userRegisterDto);
  }
}
