import { UserPatchDto } from 'src/user/domain/dto/user.patch.dto';
import { UserModel } from 'src/user/domain/model/user.model';

export class RestPatchUserMapper {
  patchUserDtoToUserModel(userPatchDto: UserPatchDto, userTarget: UserModel): UserModel {
    if (userPatchDto.username != null) {
      userTarget.username = userPatchDto.username;
    }
    if (userPatchDto.description != null) {
      userTarget.description = userPatchDto.description;
    }
    if (userPatchDto.imgPerfil != null) {
      userTarget.imgPerfil = userPatchDto.imgPerfil;
    }
    if (userPatchDto.imgBanner != null) {
      userTarget.imgBanner = userPatchDto.imgBanner;
    }
    return userTarget;
  }
}
