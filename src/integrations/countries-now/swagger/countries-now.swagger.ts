import { ApiProperty } from '@nestjs/swagger';

export class Population {
  @ApiProperty({
    type: Number,
    required: true,
    example: 1921,
  })
  year: number;
  @ApiProperty({
    type: Number,
    required: true,
    example: 47000000,
  })
  value: number;
}

export class GetAllPopulationResponse {
  @ApiProperty({
    type: String,
    required: true,
    description: 'country name',
  })
  country: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'code of country',
  })
  code: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'iso3 format code',
  })
  iso3: string;

  @ApiProperty({
    type: Population,
    isArray: true,
  })
  populationsCounts: Population[];
}

export class GetAllFlagsResponse {
  @ApiProperty({
    type: String,
    required: true,
    description: 'country name',
  })
  name: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'link to flag image',
  })
  flag: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'iso2 format code',
  })
  iso2: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'iso3 format code',
  })
  iso3: string;
}
