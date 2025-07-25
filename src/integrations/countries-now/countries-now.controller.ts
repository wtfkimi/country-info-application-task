import { Controller, Get, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CountriesNowService } from './countries-now.service';
import { GetAllFlagsResponse, GetAllPopulationResponse } from './swagger/countries-now.swagger';

@ApiTags('Integrations')
@Controller('integrations/countries-now')
export class CountriesNowController {
  constructor(private readonly countriesNowService: CountriesNowService) {}

  @ApiResponse({
    type: GetAllPopulationResponse,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('all-populations')
  async getAllPopulations() {
    return await this.countriesNowService.getAllPopulation();
  }

  @ApiResponse({
    type: GetAllFlagsResponse,
    isArray: true,
    status: HttpStatus.OK,
  })
  @Get('all-flags')
  async getAllFlags() {
    return await this.countriesNowService.getAllCountriesFlag();
  }
}
