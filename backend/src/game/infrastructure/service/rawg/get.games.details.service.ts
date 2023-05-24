import * as qs from 'qs';
import * as dotenv from 'dotenv';
dotenv.config();
export class GetGamesDetailsService {
  async gameDetails(
    page_size?: number,
    search?: string,
    search_precise?: boolean,
    search_exact?: boolean,
    platforms?: number,
    developers?: number,
    genres?: number,
    tags?: number,
    dates?: string,
    metacritic?: number,
    ordering?: string,
  ) {
    const queryParams = {
      page_size,
      search,
      search_precise,
      search_exact,
      platforms,
      developers,
      genres,
      tags,
      dates,
      metacritic,
      ordering,
    };
    // Filtra los parámetros indefinidos
    const filteredParams = Object.entries(queryParams)
      .filter(([value]) => value !== undefined)
      .reduce((obj, [key, value]) => {
        obj[key] = value;
        return obj;
      }, {});
    const queryString = qs.stringify(filteredParams);
    const apiUrl = `https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}&${queryString}`;
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
