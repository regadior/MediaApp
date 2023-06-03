export class GetGameByIdService {
  async gameGameById(gameId: number) {
    const apiUrl = `https://api.rawg.io/api/games/${gameId}?key=${process.env.RAWG_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const game = await response.json();
      return game;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
