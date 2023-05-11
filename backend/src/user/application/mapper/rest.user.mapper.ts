import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { Mapper } from 'ts-mapstruct';
import { UserRegisterDto } from '../dto/user.register.dto';
import { UserRegisterResponseDto } from '../dto/user.register.response.dto';
import { UserModel } from 'src/user/domain/model/user.model';

@Mapper()
export class RestUserMapper {
  registerDtoToModel(userRegisterDto: UserRegisterDto): UserModel {
    const userModel = new UserModel();
    userModel.name = userRegisterDto.name;
    userModel.surenames = userRegisterDto.surenames;
    userModel.username = userRegisterDto.username;
    userModel.email = userRegisterDto.email;
    userModel.password = userRegisterDto.password1;
    return userModel;
  }
  // modelToRegisterResponseDto(userModel: UserModel): UserRegisterResponseDto {

  // }
}
