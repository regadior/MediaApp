// import { RestUserMapper } from 'src/user/api_rest/mapper/rest.user.mapper';
// import { UserRegisterDto } from 'src/user/domain/dto/user.register.dto';
// import { Body, Controller, HttpCode, HttpStatus, Patch, UsePipes, ValidationPipe } from '@nestjs/common';
// @Controller('/api/auth')
// export class PatchGameForUserController {
//   constructor(private readonly createUserUseCase: CreateUserUseCase, private readonly restUserMapper: RestUserMapper) {}
//   @Patch('/register')
//   @HttpCode(HttpStatus.NO_CONTENT)
//   @UsePipes(new ValidationPipe({ transform: true }))
//   public async patchGameForUser(@Body() userRegisterDto: UserRegisterDto) {
//     return;
//   }
// }
