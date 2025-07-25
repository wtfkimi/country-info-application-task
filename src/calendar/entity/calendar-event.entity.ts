import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { CalendarEntity } from './calendar.entity';

@Unique(['name', 'calendar'])
@Entity({ name: 'calendar_event' })
export class CalendarEventEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 2, nullable: false })
  country: string;

  @Column({ type: 'varchar', length: 255, name: 'event' })
  name: string;

  @ManyToOne(() => CalendarEntity, (calendar) => calendar.events, { onDelete: 'CASCADE', nullable: false })
  @JoinColumn({ name: 'calendar_id' })
  calendar: CalendarEntity;
}
