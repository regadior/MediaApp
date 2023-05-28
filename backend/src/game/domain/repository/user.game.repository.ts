import { UserGameModel } from '../model/user.game.model';

export interface UserGameRepository {
  findOneGameUserByGameId(gameId: number): Promise<UserGameModel | null>;
  findOneGameUserByGameIdAndUserId(gameId: number, userId: number): Promise<UserGameModel | null>;
  findOneGameUserByUserGameIdAndUserId(userGameId: number, userId: number): Promise<UserGameModel | null>;
  findOneGameUserByUserId(userId: number): Promise<UserGameModel | null>;
  findOneGameUserByUserGameId(userGameId: number): Promise<UserGameModel | null>;
  findAllByWhishlistTrueAndUserId(userId: number): Promise<UserGameModel[] | null>;
  updateGameUser(userGameModel: UserGameModel);
}
export const UserGameRepository = Symbol('UserGameRepository');
