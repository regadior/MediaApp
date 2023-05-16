import { UserBasicResponseDto } from 'src/user/domain/dto/user.basic.dto';
import { UserLoginDto } from './../../domain/dto/user.login.dto';
import { UserRegisterDto } from 'src/user/domain/dto/user.register.dto';
import { UserRolResponseDto } from 'src/user/domain/dto/user.rol.response.dto';
import { UserModel } from 'src/user/domain/model/user.model';

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
  UserModelToUserBasicResponseDto(userModel: UserModel): UserBasicResponseDto {
    const userBasicResponseDto = new UserBasicResponseDto();
    userBasicResponseDto.userId = userModel.userId;
    userBasicResponseDto.name = userModel.name;
    userBasicResponseDto.username = userModel.username;
    userBasicResponseDto.surenames = userModel.surenames;
    userBasicResponseDto.email = userModel.email;
    userBasicResponseDto.rol = new UserRolResponseDto(userModel.rol.name, userModel.rol.description);
    return userBasicResponseDto;
  }
  UserLoginDtoToUserModel(userLoginDto: UserLoginDto): UserModel {
    const userModel = new UserModel();
    userModel.username = userLoginDto.username;
    userModel.password1 = userLoginDto.password1;
    userModel.password2 = userLoginDto.password2;
    return userModel;
  }
}
