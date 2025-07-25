import { ApiProperty } from '@nestjs/swagger';

class BorderDto {
  @ApiProperty({ description: 'Common name of the bordering country', type: String })
  commonName: string;

  @ApiProperty({ description: 'Official name of the bordering country', type: String })
  officialName: string;

  @ApiProperty({ description: 'ISO 2-letter country code of the bordering country', type: String })
  countryCode: string;

  @ApiProperty({ description: 'Region of the bordering country', type: String })
  region: string;

  @ApiProperty({ description: 'Borders of the bordering country (nullable)', type: [BorderDto], nullable: true })
  borders: BorderDto[] | null;
}

class InfoDto {
  @ApiProperty({ description: 'Common name of the country', type: String })
  commonName: string;

  @ApiProperty({ description: 'Official name of the country', type: String })
  officialName: string;

  @ApiProperty({ description: 'ISO 2-letter country code', type: String })
  countryCode: string;

  @ApiProperty({ description: 'Region of the country', type: String })
  region: string;

  @ApiProperty({ description: 'List of bordering countries', type: [BorderDto] })
  borders: BorderDto[];
}

class PopulationCountDto {
  @ApiProperty({ description: 'Year of the population count', type: Number })
  year: number;

  @ApiProperty({ description: 'Population value for the given year', type: Number })
  value: number;
}

class PopulationDto {
  @ApiProperty({ description: 'Country name', type: String })
  country: string;

  @ApiProperty({ description: 'Country ISO3 code', type: String })
  code: string;

  @ApiProperty({ description: 'Country ISO3 code', type: String })
  iso3: string;

  @ApiProperty({ description: 'Population counts over years', type: [PopulationCountDto] })
  populationCounts: PopulationCountDto[];
}

export class CountryResponseDto {
  @ApiProperty({ description: 'Country information', type: InfoDto })
  info: InfoDto;

  @ApiProperty({ description: 'Population data of the country', type: PopulationDto })
  population: PopulationDto;

  @ApiProperty({ description: 'URL of the country flag image', type: String })
  flag: string;
}
