import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarService } from './calendar.service';
import { CalendarEntity } from './entity/calendar.entity';
import { CalendarRepository } from './repository/calendar.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CalendarEntity])],
  providers: [CalendarService, CalendarRepository],
  exports: [CalendarService],
})
export class CalendarModule {}
