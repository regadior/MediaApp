import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import * as qs from 'qs';
import * as dotenv from 'dotenv';
dotenv.config();
@Controller('/api')
export class RawgGameListController {
  @Get('/games')
  @HttpCode(HttpStatus.OK)
  public async getGameListFilter(
    @Query('page_size') page_size?: number,
    @Query('search') search?: string,
    @Query('search_precise') search_precise?: boolean,
    @Query('search_exact') search_exact?: boolean,
    @Query('platforms') platforms?: number,
    @Query('developers') developers?: number,
    @Query('genres') genres?: number,
    @Query('tags') tags?: number,
    @Query('dates') dates?: string,
    @Query('metacritic') metacritic?: number,
    @Query('ordering') ordering?: string,
  ) {
    const apiKey = process.env.RAWG_API_KEY;
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
    const apiUrl = `https://api.rawg.io/api/games?key=${apiKey}&${queryString}`;
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
