import { UserGameModel } from '../model/user.game.model';

export interface UserGameSavegameRepository {
  findOneByUserGameSavegameId(gameId: number): Promise<UserGameModel | null>;
}
export const UserGameSavegameRepository = Symbol('UserGameSavegameRepository');
