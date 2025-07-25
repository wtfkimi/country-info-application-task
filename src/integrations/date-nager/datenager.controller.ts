import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { DatenagerService } from './datenager.service';
import { AvailableCountriesResponse } from './swagger/datenager.swagger';
import { AvailableCountries } from './types/datenager.types';

@ApiTags('Integrations')
@Controller('integrations/date-nager')
export class DatenagerController {
  constructor(private readonly dateNagerService: DatenagerService) {}

  @ApiResponse({
    type: AvailableCountriesResponse,
    isArray: true,
  })
  @Get('available-countries')
  async availableCountries(): Promise<AvailableCountries[]> {
    return await this.dateNagerService.getAvailableCountries();
  }
}
