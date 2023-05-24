import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetGenresService } from 'src/game/infrastructure/service/rawg/get.genres.service';

@Controller('/api/games')
export class GetRawgGameGenreController {
  constructor(private readonly getGenresService: GetGenresService) {}
  @Get('/genres')
  @HttpCode(HttpStatus.OK)
  public async getGameGenre() {
    return await this.getGenresService.gameGenres();
  }
}
