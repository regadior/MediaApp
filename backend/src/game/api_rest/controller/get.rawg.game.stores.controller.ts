import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { GetStoresService } from 'src/game/infrastructure/service/rawg/get.stores.service';

@Controller('/api/games')
export class GetRawgGameStoresontroller {
  constructor(private readonly getStoresService: GetStoresService) {}
  @Get('/stores')
  @HttpCode(HttpStatus.OK)
  public async getGameStores() {
    return await this.getStoresService.gameStores();
  }
}
