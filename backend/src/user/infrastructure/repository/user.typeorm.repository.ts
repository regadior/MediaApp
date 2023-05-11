import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserEntity } from '../entity/user.entity';
import { UserModel } from 'src/user/domain/model/user.model';
import { Repository } from 'typeorm';
export class UserTypeormRepository extends Repository<UserEntity> implements UserRepository {
  async findByUsername(username: string): Promise<UserModel | null> {
    const user = await this.findOneBy({ username: username });
    return user;
  }
  async findByEmail(email: string): Promise<UserModel | null> {
    const user = await this.findOneBy({ email: email });
    return user;
  }
  async createUser(email: string): Promise<UserModel | null> {
    const user = await this.findOneBy({ email: email });
    return user;
  }
  public async responder(mensaje: string): Promise<string> {
    return mensaje + ' Hola bobi';
  }
}
