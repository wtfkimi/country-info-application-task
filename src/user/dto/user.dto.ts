import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsIn, IsNumber, IsString, Min } from 'class-validator';
import { iso2countries } from '../../integrations/countries-now/type/countries-now.type';

export class EventUserDto {
  @ApiProperty({
    required: true,
    description: 'country in iso2 format(AM, UA)',
    type: String,
  })
  @IsIn(iso2countries)
  countryCode: string;

  @ApiProperty({
    type: Number,
    required: true,
    description: 'year of the event',
  })
  @IsNumber()
  @Min(1900)
  year: number;

  @ApiProperty({
    type: String,
    isArray: true,
    required: true,
    description: 'Event names list. If event exist in existing calendar, it will be ignored and will not added',
  })
  @IsArray()
  @IsString({ each: true })
  holidays: string[];
}
