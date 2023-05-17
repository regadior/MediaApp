import { TokenUtils } from '../../../auth/application/use_case/token.utils';
import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserNotFoundException } from 'src/user/domain/exception/user.notfound.exception';
import { PassNotMatchException } from 'src/user/domain/exception/pass.not.match.exception';
@Injectable()
export class LogUserUseCase {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
    private readonly tokenUtils: TokenUtils,
  ) {}
  public async logUser(userModel: UserModel): Promise<UserModel> {
    const existingUser = await this.userRepository.findOneByUsername(userModel.username);
    if (existingUser == null) {
      throw new UserNotFoundException(`User with username ${userModel.username} not found`);
    }
    if (existingUser.password1 != userModel.password1) {
      throw new PassNotMatchException(`Incorrect password for user: ${userModel.username}`);
    }
    const userToken = await this.tokenUtils.generateToken(existingUser);

    return userToken;
  }
}
