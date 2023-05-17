import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/domain/model/user.model';
@Injectable()
export class TokenUtils {
  constructor(private readonly jwtService: JwtService) {}
  async generateToken(user: UserModel): Promise<UserModel> {
    const payload = {
      userId: user.userId,
      name: user.name,
      surnames: user.surenames,
      email: user.email,
      username: user.username,
      rol: user.rol.name,
    };
    const token = this.jwtService.sign(payload, { secret: 'secretkey' });
    user.accessToken = token;
    return user;
  }
}
