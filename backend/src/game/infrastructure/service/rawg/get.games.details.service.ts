import * as qs from 'qs';
import * as dotenv from 'dotenv';
dotenv.config();

export class GetGamesDetailsService {
  async gameDetails(
    page?: number,
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
      page,
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

    // Eliminar parámetros con valores de cadena vacía
    for (const key in queryParams) {
      if (queryParams.hasOwnProperty(key) && queryParams[key] === '') {
        delete queryParams[key];
      }
    }
    const queryString = qs.stringify(queryParams);
    console.log(platforms);
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
