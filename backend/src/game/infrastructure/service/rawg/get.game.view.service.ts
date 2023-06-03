import { Injectable, Inject } from '@nestjs/common';
import fetch from 'node-fetch';
import * as dotenv from 'dotenv';
import { UserGameRepository } from 'src/game/domain/repository/user.game.repository';

dotenv.config();

@Injectable()
export class GetGameViewService {
  constructor(
    @Inject(UserGameRepository)
    private readonly userGameRepository: UserGameRepository,
  ) {}

  async gameDetails(name: string, userId: number) {
    const apiUrl = `https://api.rawg.io/api/games/${name}?key=${process.env.RAWG_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const game = await response.json();
      if (userId) {
        const whishlist = await this.userGameRepository.findOneGameUserByGameIdAndUserId(game.id, userId);
        console.log(whishlist);
        game.whishlist = whishlist; // Añadir la propiedad 'whishlist' al objeto 'game'
      }
      return game; // Devolver el objeto 'game' actualizado
    } catch (error) {
      console.error('Error making RAWG API request:', error);
      return 'Error making RAWG API request';
    }
  }
}
