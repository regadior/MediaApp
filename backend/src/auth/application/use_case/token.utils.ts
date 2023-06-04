import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserModel } from 'src/user/domain/model/user.model';
import { UnauthorizedException } from '../exception/unauthorized.exception';
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
  async verifyTokenByUserId(tokenB: string, userId2: number): Promise<void> {
    try {
      const token = tokenB.replace('Bearer ', '');
      const payload = this.jwtService.verify(token, { secret: 'secretkey' });
      const { userId, rol } = payload;
      if (userId !== userId2 && rol !== 'admin') {
        throw new UnauthorizedException('Token is invalid');
      }
    } catch (error) {
      throw new UnauthorizedException('Token is invalid');
    }
  }
}
