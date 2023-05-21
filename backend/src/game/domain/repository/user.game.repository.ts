import { UserGameModel } from '../model/user.game.model';

export interface UserGameRepository {
  findOneGameUserByGameId(gameId: number): Promise<UserGameModel | null>;
  findOneGameUserByUserId(userId: number): Promise<UserGameModel | null>;
  updateGameUser(userGameModel: UserGameModel);
}
export const UserGameRepository = Symbol('UserGameRepository');
