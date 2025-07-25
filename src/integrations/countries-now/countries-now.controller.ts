import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesNowService } from './countries-now.service';
import { GetAllFlagsResponse, GetAllPopulationResponse } from './swagger/countries-now.swagger';
import { Flag, PopulationCountry } from './type/countries-now.type';

@ApiTags('Integrations')
@Controller('integrations/countries-now')
export class CountriesNowController {
  constructor(private readonly countriesNowService: CountriesNowService) {}

  @ApiOperation({ summary: 'Get all populations' })
  @ApiResponse({
    type: GetAllPopulationResponse,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('all-populations')
  async getAllPopulations(): Promise<PopulationCountry[]> {
    return await this.countriesNowService.getAllPopulation();
  }

  @ApiOperation({ summary: 'Get all flags' })
  @ApiResponse({
    type: GetAllFlagsResponse,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('all-flags')
  async getAllFlags(): Promise<Flag[]> {
    return await this.countriesNowService.getAllCountriesFlag();
  }
}
