import { RestUserMapper } from './../mapper/rest.user.mapper';
import { Inject } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UsernameNotFoundException } from 'src/user/domain/exception/username.notfound.exception';

export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly restUserMapper: RestUserMapper,
  ) {}
  public async createUser(userRegister: UserRegisterDto): Promise<string> {
    // const existingUsername = await this.userRepository.findByUsername(userRegister.username);
    // if (existingUsername) {
    //   throw new UsernameNotFoundException(`User with username ${userRegister.username} already exists`);
    // }
    // const existingEmail = await this.userRepository.findByUsername(userRegister.email);
    // if (existingEmail) {
    //   throw new UsernameNotFoundException(`User with email ${userRegister.username} already exists`);
    // }
    console.log(this.restUserMapper.registerDtoToModel(userRegister));
    return 'funciona';
  }

  public async reponder(mensaje: string): Promise<string> {
    return this.userRepository.responder(mensaje);
  }
}
