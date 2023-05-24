export class GetGenresService {
  async gameGenres() {
    const apiUrl = `https://api.rawg.io/api/genres?key=${process.env.RAWG_API_KEY}`;
    try {
      const response = await fetch(apiUrl);
      const genres = await response.json();
      return genres;
    } catch (error) {
      console.error('Error making rawg API request:', error);
      return 'Error making rawg API request:';
    }
  }
}
