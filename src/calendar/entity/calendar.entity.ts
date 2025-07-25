import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { User } from '../../user/entity/user.entity';
import { CalendarEventEntity } from './calendar-event.entity';

@Unique(['year', 'user'])
@Entity({ name: 'calendar' })
export class CalendarEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  year: number;

  @OneToMany(() => CalendarEventEntity, (calendarEvent) => calendarEvent.calendar, { cascade: true })
  events: CalendarEventEntity[];

  @ManyToOne(() => User, (user) => user.calendars, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'user_id' })
  user: User;
}
