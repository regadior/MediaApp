import { GameStateModel } from '../model/game.state.model';

export interface GameStateRepository {
  findOneByState(state: string): Promise<GameStateModel | null>;
}
export const GameStateRepository = Symbol('GameStateRepository');
