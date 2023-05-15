import { Ticket } from './../../domain/model/Ticket';
import { TicketRepository } from './../../domain/repository/TicketRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TicketInMemory implements TicketRepository {
  private readonly tickets: Ticket[] = [];

  create(ticket: Ticket): Ticket {
    this.tickets.push(ticket);
    return ticket;
  }

  findAll(): Ticket[] {
    return this.tickets;
  }
}
