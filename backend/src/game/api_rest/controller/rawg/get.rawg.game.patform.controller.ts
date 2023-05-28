import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetPlatformService } from 'src/game/infrastructure/service/rawg/get.platform.service';

@Controller('/api/games')
export class GetRawgGamePaltformController {
  constructor(private readonly getPlatformService: GetPlatformService) {}
  @Get('/platforms')
  @HttpCode(HttpStatus.OK)
  public async getGamePlatform(@Query('page') page?: number) {
    return await this.getPlatformService.gamePlatform(page);
  }
}
