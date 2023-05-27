import { UserGameModel } from '../model/user.game.model';
import { UserGameSavegameModel } from '../model/user.game.savegame.model';

export interface UserGameSavegameRepository {
  findOneByUserGameSavegameId(gameId: number): Promise<UserGameModel | null>;
  create(userGameSavegameModel: UserGameSavegameModel): Promise<UserGameSavegameModel | null>;
}
export const UserGameSavegameRepository = Symbol('UserGameSavegameRepository');
