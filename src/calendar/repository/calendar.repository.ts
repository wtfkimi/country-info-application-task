import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEntity } from '../entity/calendar.entity';

@Injectable()
export class CalendarRepository {
  constructor(
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  async getCalendarByYear({ year, id }: { year: number; id: number }) {
    return await this.calendarRepository.findOne({ where: { year, user: { id } }, relations: { events: true } });
  }

  async save(event: CalendarEntity) {
    return await this.calendarRepository.save(event);
  }
}
