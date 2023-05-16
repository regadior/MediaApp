import { UserRolModel } from './../../domain/model/user.rol.model';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
import { UsernameUsedException } from 'src/user/domain/exception/username.used.exception';
import { EmailUsedException } from 'src/user/domain/exception/email.used.exception';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async createUser(userModel: UserModel): Promise<UserModel> {
    const existingUsername = await this.userRepository.findOneByUsername(userModel.username);
    if (existingUsername != null) {
      throw new UsernameUsedException(`User with username ${userModel.username} already exists`);
    }
    const existingEmail = await this.userRepository.findOneByEmail(userModel.email);
    if (existingEmail != null) {
      throw new EmailUsedException(`User with email ${userModel.email} already exists`);
    }
    userModel.description = 'Write here your description';
    userModel.imgBanner = 'https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg';
    userModel.imgPerfil = 'https://imagen-ai.com/wp-content/uploads/2022/07/open-graph-default.jpg';
    const userRolModel: UserRolModel = new UserRolModel(1, 'user', 'Normal user');
    userModel.rol = userRolModel;
    const user = this.userRepository.createUser(userModel);
    return user;
  }
}
