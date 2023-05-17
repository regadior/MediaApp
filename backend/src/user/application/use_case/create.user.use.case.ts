import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
import { UsernameUsedException } from 'src/user/domain/exception/username.used.exception';
import { EmailUsedException } from 'src/user/domain/exception/email.used.exception';
import { UserRolRepository } from 'src/user/domain/repository/user.rol.repository';
@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    @Inject(UserRolRepository)
    private readonly userRolRepository: UserRolRepository,
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
    const userRol = await this.userRolRepository.findOneByName('user');
    userModel.rol = userRol;
    const user = this.userRepository.createUser(userModel);
    return user;
  }
}
