import { Injectable } from '@nestjs/common';
import { CalendarEntity } from './entity/calendar.entity';
import { CalendarRepository } from './repository/calendar.repository';

@Injectable()
export class CalendarService {
  constructor(private readonly calendarRepository: CalendarRepository) {}

  async findCalendarByYear({ year, id }: { year: number; id: number }) {
    return this.calendarRepository.getCalendarByYear({ year, id });
  }

  async saveEvent(event: CalendarEntity) {
    return await this.calendarRepository.save(event);
  }
}
