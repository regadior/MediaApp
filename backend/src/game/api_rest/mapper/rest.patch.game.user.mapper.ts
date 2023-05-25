import { UserGamePatchDto } from 'src/game/domain/dto/user.game.patch.dto';
import { UserGameModel } from 'src/game/domain/model/user.game.model';

export class RestPatchGameUserMapper {
  patchUserGameDtoToUserGameModel(userGamePatchDto: UserGamePatchDto, userTarget: UserGameModel): UserGameModel {
    if (userGamePatchDto.score != null) {
      userTarget.score = userGamePatchDto.score;
    }
    if (userGamePatchDto.state != null) {
      userTarget.gameState.state = userGamePatchDto.state;
    }
    if (userGamePatchDto.whishlist != null) {
      userTarget.whishlist = userGamePatchDto.whishlist;
    }
    return userTarget;
  }
}
