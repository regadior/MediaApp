import { TicketRepository } from './../../domain/repository/TicketRepository';
import { Ticket } from './../../domain/model/Ticket';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class TicketService {
  constructor(
    @Inject(TicketRepository)
    private readonly tickerRepository: TicketRepository,
  ) {}

  create(description: string, priority: number): Ticket {
    const ticket = new Ticket(description, priority);
    // TODO: check count of tickets less than 3
    if (this.findActiveTickets().length >= 3) {
      throw new Error('Ticket count is more than 3');
    }
    this.tickerRepository.create(ticket);
    return ticket;
  }

  findAll(): Ticket[] {
    return this.tickerRepository.findAll();
  }

  findActiveTickets(): Ticket[] {
    return this.tickerRepository.findAll().filter((ticket) => !ticket.isClosed);
  }
}
