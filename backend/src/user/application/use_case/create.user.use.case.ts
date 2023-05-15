import { UserRolModel } from './../../domain/model/user.rol.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
@Injectable()
export class CreateUserUseCase {
  constructor(
    // private readonly restUserMapper: RestUserMapper,
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async createUser(userModel: UserModel): Promise<UserModel> {
    // const existingUsername = await this.userRepository.findByUsername(userRegister.username);
    // if (existingUsername) {
    //   throw new UsernameNotFoundException(`User with username ${userRegister.username} already exists`);
    // }
    // const existingEmail = await this.userRepository.findByUsername(userRegister.email);
    // if (existingEmail) {
    //   throw new UsernameNotFoundException(`User with email ${userRegister.username} already exists`);
    // }
    // https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg
    userModel.description = 'Write here your description';
    userModel.imgBanner = 'https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg';
    userModel.imgPerfil = 'https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg';
    const userRolModel: UserRolModel = new UserRolModel(1, 'user', 'Normal user');
    userModel.rol = userRolModel;
    const user = this.userRepository.createUser(userModel);
    return user;
  }
}
