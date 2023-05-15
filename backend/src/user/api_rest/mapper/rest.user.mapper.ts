import { UserRegisterDto } from 'src/user/domain/dto/user.register.dto';
import { UserRegisterResponseDto } from 'src/user/domain/dto/user.register.response.dto';
import { UserModel } from 'src/user/domain/model/user.model';
import { UserRolModel } from 'src/user/domain/model/user.rol.model';

export class RestUserMapper {
  registerDtoToUserModel(userRegisterDto: UserRegisterDto): UserModel {
    const userModel = new UserModel();
    userModel.name = userRegisterDto.name;
    userModel.surenames = userRegisterDto.surenames;
    userModel.username = userRegisterDto.username;
    userModel.email = userRegisterDto.email;
    userModel.password1 = userRegisterDto.password1;
    userModel.password2 = userRegisterDto.password2;
    return userModel;
  }
  UserModelToRegisterResponseDto(userModel: UserModel): UserRegisterResponseDto {
    const userRegisterResponseDto = new UserRegisterResponseDto();
    userRegisterResponseDto.userId = userModel.userId;
    userRegisterResponseDto.name = userModel.name;
    userRegisterResponseDto.username = userModel.username;
    userRegisterResponseDto.surenames = userModel.surenames;
    userRegisterResponseDto.email = userModel.email;
    userRegisterResponseDto.rol = new UserRolModel(userModel.rol.userRolId, userModel.rol.name, userModel.rol.description);
    return userRegisterResponseDto;
  }
}
