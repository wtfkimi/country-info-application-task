import { Controller, Get, HttpStatus, Param } from '@nestjs/common';
import { ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetCountryInfo } from './dto/mixed-integration.dto';
import { MixedIntegrationService } from './mixed-integration.service';
import { CountryResponseDto } from './swagger/mixed-integration.swagger';

@ApiTags('integrations')
@Controller('integrations/mixed')
export class MixedIntegrationController {
  constructor(private readonly mixedIntegrationService: MixedIntegrationService) {}

  @ApiParam({ name: 'country', description: 'iso2 format' })
  @ApiResponse({
    type: CountryResponseDto,
    status: HttpStatus.OK,
  })
  @Get('get-country-info/:country')
  async getCountryInfo(@Param() param: GetCountryInfo) {
    return await this.mixedIntegrationService.getCountryInfo(param.country);
  }
}
