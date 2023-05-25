import { UserModel } from 'src/user/domain/model/user.model';
import { UserGameSavegameModel } from './user.game.savegame.model';
import { GameStateModel } from './game.state.model';

export class UserGameModel {
  userGameId: number;
  userModel: UserModel;
  gameId: number;
  score: number;
  whishlist: boolean;
  gameState: GameStateModel;
  userGameSavegames: UserGameSavegameModel[];
}
