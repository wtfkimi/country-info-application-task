import { ForbiddenException, Injectable } from '@nestjs/common';
import { CalendarService } from '../calendar/calendar.service';
import { CalendarEventEntity } from '../calendar/entity/calendar-event.entity';
import { CalendarEntity } from '../calendar/entity/calendar.entity';
import { DatenagerService } from '../integrations/date-nager/datenager.service';
import { EventUserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly dateNagerService: DatenagerService,
    private readonly calendarService: CalendarService,
  ) {}

  create(user: User): Promise<User> {
    return this.userRepository.create(user);
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOneByEmail(email);
  }

  async addNationalDayToUser({
    idChange,
    userId,
    eventDto,
  }: {
    idChange: string;
    userId: number;
    eventDto: EventUserDto;
  }) {
    if (Number(idChange) !== userId) throw new ForbiddenException('Not allowed to modify or add other user calendar');

    const user = await this.userRepository.findOneById(userId);

    const holidays = await this.dateNagerService.getHolidayByYearAndCountryCode({
      year: eventDto.year,
      countryCode: eventDto.countryCode,
    });
    const holidaysNames = holidays.map((holidays) => holidays.localName);

    const newEvents = [];

    if (holidays.length === 0) return { quantity: holidays.length, events: newEvents };

    const calendar = await this.calendarService.findCalendarByYear({ year: eventDto.year, id: userId });

    if (calendar) {
      const existingEvents = calendar.events;
      const existingEventsName = existingEvents.map((el) => el.name);

      for (const event of eventDto.holidays) {
        if (holidaysNames.includes(event) && !existingEventsName.includes(event)) {
          const newEvent = new CalendarEventEntity();
          newEvent.name = event;
          existingEvents.push(newEvent);
          newEvents.push(newEvent.name);
        }
      }
      await this.calendarService.saveEvent(calendar);
      return { quantity: newEvents.length, events: newEvents };
    }

    const newCalendar = new CalendarEntity();
    newCalendar.year = eventDto.year;
    newCalendar.user = user;

    newCalendar.events = eventDto.holidays.map((name) => {
      const event = new CalendarEventEntity();
      newEvents.push(name);
      event.name = name;
      event.country = eventDto.countryCode;
      return event;
    });

    await this.calendarService.saveEvent(newCalendar);
    return { quantity: newEvents.length, events: newEvents };
  }
}
