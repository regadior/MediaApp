import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetGamesDetailsService } from 'src/game/infrastructure/service/rawg/get.games.details.service';
@Controller('/api')
export class RawgGameListController {
  constructor(private readonly getGamesDetailsService: GetGamesDetailsService) {}
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
    try {
      const games = await this.getGamesDetailsService.gameDetails(
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
      );
      return games;
    } catch (error) {
      console.error('Error:', error);
      return 'Error occurred while fetching game details.';
    }
  }
}
