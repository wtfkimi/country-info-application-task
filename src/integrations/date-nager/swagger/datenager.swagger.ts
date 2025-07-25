import { ApiProperty } from '@nestjs/swagger';

export class AvailableCountriesResponse {
  @ApiProperty({
    type: String,
    required: true,
    description: 'country code',
  })
  countryCode: string;

  @ApiProperty({
    type: String,
    required: true,
    description: 'name of country',
  })
  name: string;
}
