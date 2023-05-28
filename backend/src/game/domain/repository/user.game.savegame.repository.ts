import { UserGameModel } from '../model/user.game.model';
import { UserGameSavegameModel } from '../model/user.game.savegame.model';

export interface UserGameSavegameRepository {
  findOneBySaveGameId(gameId: number): Promise<UserGameSavegameModel | null>;
  create(userGameSavegameModel: UserGameSavegameModel): Promise<UserGameSavegameModel | null>;
}
export const UserGameSavegameRepository = Symbol('UserGameSavegameRepository');
