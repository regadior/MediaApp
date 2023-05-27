import { GameStateModel } from "./game.state.model";
import { UserGameModel } from "./user.game.model";

export class UserGameSavegameModel {
  userGameSavegameId: number;
  name: string;
  state: GameStateModel;
  description: string;
  dateSave: string;
  userGame: UserGameModel;
}
