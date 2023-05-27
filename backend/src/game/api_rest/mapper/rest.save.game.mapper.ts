import { UserGameSavegameDto } from 'src/game/domain/dto/user.game.savegame.dto';
import { GameStateModel } from 'src/game/domain/model/game.state.model';
import { UserGameSavegameModel } from 'src/game/domain/model/user.game.savegame.model';

export class RestSaveGameMapper {
  userSavegameDtoToSaveGameModel(userGameSavegameDto: UserGameSavegameDto): UserGameSavegameModel {
    const userGameSavegameModel = new UserGameSavegameModel();
    userGameSavegameModel.name = userGameSavegameDto.name;
    userGameSavegameModel.description = userGameSavegameDto.description;
    userGameSavegameModel.state = new GameStateModel();
    userGameSavegameModel.state.state = userGameSavegameDto.state;
    userGameSavegameModel.dateSave = userGameSavegameDto.dateSave;
    return userGameSavegameModel;
  }
}
