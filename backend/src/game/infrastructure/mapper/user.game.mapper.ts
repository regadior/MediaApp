import { UserEntity } from './../../../user/infrastructure/entity/user.entity';
import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { UserGameEntity } from '../entity/user.game.entity';
import { UserModel } from 'src/user/domain/model/user.model';
import { GameStateEntity } from '../entity/game.state.entity';

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
  UserGameModelToUserGameEntity(userGameModel: UserGameModel): UserGameEntity {
    const userGameEntity = new UserGameEntity();
    userGameEntity.userGameId = userGameModel.userGameId;
    userGameEntity.gameId = userGameModel.gameId;
    userGameEntity.score = userGameModel.score;
    userGameEntity.whishlist = userGameModel.whishlist;
    const gameStateEntity = new GameStateEntity();
    gameStateEntity.gameStateid = userGameModel.gameState.gameStateid;
    gameStateEntity.state = userGameModel.gameState.state;
    gameStateEntity.description = userGameModel.gameState.description;
    userGameEntity.gameState = gameStateEntity;
    const userEntity = new UserEntity();
    userEntity.userId = userGameModel.userModel.userId;
    userEntity.username = userGameModel.userModel.username;
    userEntity.email = userGameModel.userModel.email;
    userGameEntity.userEntity = userEntity;
    userGameEntity.userGameSavegames = userGameEntity.userGameSavegames;
    return userGameEntity;
  }
  favouriteUserGameModelToUserGameEntity(userGameModel: UserGameModel): UserGameEntity {
    const userGameEntity = new UserGameEntity();
    userGameEntity.gameId = userGameModel.gameId;
    const userEntity = new UserEntity();
    userEntity.userId = userGameModel.userModel.userId;
    userGameEntity.userEntity = userEntity;
    userGameEntity.whishlist = userGameModel.whishlist;
    userGameEntity.score = 0;
    userGameEntity.gameState = null;
    return userGameEntity;
  }
}
