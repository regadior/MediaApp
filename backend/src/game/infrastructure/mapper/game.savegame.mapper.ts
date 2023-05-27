import { GameStateEntity } from '../entity/game.state.entity';
import { UserGameEntity } from '../entity/user.game.entity';
import { UserGameSavegameEntity } from '../entity/user.game.savegame.entity';
import { UserGameSavegameModel } from 'src/game/domain/model/user.game.savegame.model';

export class GameSaveGameMapper {
  saveGameModelToSavaGameEntity(userGameSavegameModel: UserGameSavegameModel): UserGameSavegameEntity {
    const userGameSavegameEntity = new UserGameSavegameEntity();
    userGameSavegameEntity.name = userGameSavegameModel.name;
    userGameSavegameEntity.dateSave = userGameSavegameModel.dateSave;
    userGameSavegameEntity.description = userGameSavegameModel.description;
    userGameSavegameEntity.saveState = new GameStateEntity();
    userGameSavegameEntity.saveState.gameStateid = userGameSavegameModel.state.gameStateid;
    userGameSavegameEntity.userGame = new UserGameEntity();
    userGameSavegameEntity.userGame.userGameId = userGameSavegameModel.userGame.userGameId;
    return userGameSavegameEntity;
  }
  saveGameEntityToSavaGameModel(userGameSavegameEntity: UserGameSavegameEntity): UserGameSavegameModel {
    const userGameSavegameModel = new UserGameSavegameModel();
    userGameSavegameModel.userGameSavegameId = userGameSavegameEntity.userGameSavegameId;
    userGameSavegameModel.name = userGameSavegameEntity.name;
    userGameSavegameModel.dateSave = userGameSavegameEntity.dateSave;
    userGameSavegameModel.description = userGameSavegameEntity.description;
    // userGameSavegameModel.state = userGameSavegameEntity.saveState;
    return userGameSavegameModel;
  }
}
