import { Inject, Injectable } from '@nestjs/common';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRepository } from 'src/user/domain/repository/user.repository';

@Injectable()
export class FindUserByIdUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async findUserByUserId(userId: number): Promise<UserModel> {
    const existingUsername = await this.userRepository.findOneById(userId);
    if (existingUsername == null) {
      throw new UserNotFoundException(`User with id ${userId} does not exists`);
    }
    return existingUsername;
  }
}
