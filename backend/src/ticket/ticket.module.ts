import { TicketService } from './application/use_case/TicketService';
import { TicketInMemory } from './infrastructure/Orm/TicketInMemory';
import { TicketRepository } from './domain/repository/TicketRepository';
import { TicketController } from './api_rest/controller/TicketController';
import { Module } from '@nestjs/common';

@Module({
  controllers: [TicketController],

  providers: [
    TicketService,
    {
      provide: TicketRepository,
      useClass: TicketInMemory, // can add condition on ENV, inject mock impl for unit testing
    },
  ],
})
export class TicketModule {}
