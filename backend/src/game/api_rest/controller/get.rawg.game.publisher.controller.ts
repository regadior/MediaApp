import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { GetPublisherService } from 'src/game/infrastructure/service/rawg/get.publishers.service';
@Controller('/api/games')
export class GetRawgGamePublisherController {
  constructor(private readonly getPublisherService: GetPublisherService) {}
  @Get('/publishers')
  @HttpCode(HttpStatus.OK)
  public async getGamePublisher(@Query('page') page?: number) {
    return await this.getPublisherService.gamePublisher(page);
  }
}
