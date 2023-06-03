import * as dotenv from 'dotenv';
dotenv.config();
export class GetGameViewService {
  async gameDetails(name: string) {
    const apiUrl = `https://api.rawg.io/api/games/${name}?key=${process.env.RAWG_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const games = await response.json();
      return games;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
