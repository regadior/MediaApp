import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { UserGameEntity } from '../entity/user.game.entity';
import { UserModel } from 'src/user/domain/model/user.model';

export class UserGameMapper {
  UserGameEntityToUserGameModel(userGameEntity: UserGameEntity): UserGameModel {
    const userGameModel = new UserGameModel();
    userGameModel.userGameId = userGameEntity.userGameId;
    userGameModel.gameId = userGameEntity.gameId;
    userGameModel.score = userGameEntity.score;
    userGameModel.gameState = userGameEntity.gameState;
    userGameModel.whishlist = userGameEntity.whishlist;
    userGameModel.userGameSavegames = userGameEntity.userGameSavegames;
    const userModel = new UserModel();
    userModel.userId = userGameEntity.userEntity.userId;
    userModel.username = userGameEntity.userEntity.username;
    userGameModel.userModel = userModel;
    return userGameModel;
  }
}
