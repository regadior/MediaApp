import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
@Injectable()
export class LogUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}
  public async logUser(userModel: UserModel): Promise<UserModel> {
    const user = this.userRepository.createUser(userModel);
    return user;
  }
}
