import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UsernameUsedException } from 'src/user/domain/exception/username.used.exception';
@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async UpdateUserUseCase(userModel: UserModel, userId: number) {
    const userGameExists = await this.userRepository.findOneById(userId);
    if (userGameExists == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    const usernameExists = await this.userRepository.findOneByUsername(userModel.username);
    if (usernameExists != null) {
      throw new UsernameUsedException(`Username ${userModel.username} already exists`);
    }
    this.userRepository.createUser(userModel);
  }
}
