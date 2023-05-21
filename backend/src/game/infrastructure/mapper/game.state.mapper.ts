import { GameStateModel } from 'src/game/domain/model/game.state.model';
import { GameStateEntity } from '../entity/game.state.entity';

export class GameStateMapper {
  GameStateModelToGameStateEntity(gameStateModel: GameStateModel): GameStateEntity {
    const gameStatentity = new GameStateEntity();
    gameStatentity.gameStateid = gameStateModel.gameStateid;
    gameStatentity.state = gameStateModel.state;
    gameStatentity.description = gameStateModel.description;
    return gameStatentity;
  }
  GameStateEntityToGameStateModel(gameStateEntity: GameStateEntity): GameStateModel {
    const gameStateModel = new GameStateModel();
    gameStateModel.gameStateid = gameStateEntity.gameStateid;
    gameStateModel.description = gameStateEntity.description;
    gameStateModel.state = gameStateEntity.state;
    return gameStateModel;
  }
}
