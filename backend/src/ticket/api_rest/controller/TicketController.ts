import { TicketCommand } from './TicketCommand';
import { TicketService } from './../../application/use_case/TicketService';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';

@Controller({
  path: 'tickets',
  version: ['1'],
})
export class TicketController {
  private readonly logger = new Logger(TicketController.name);

  constructor(private ticketService: TicketService) {}

  @Get()
  findAll(): any[] {
    return this.ticketService.findAll();
  }

  @Post()
  create(@Body() tickeCommand: TicketCommand): any {
    const ticker = this.ticketService.create(tickeCommand.description, tickeCommand.priority);
    this.logger.debug(tickeCommand);
    this.logger.debug({ ticker });
    return { ...ticker };
  }
}
