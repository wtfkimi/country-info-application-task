import { Module } from '@nestjs/common';
import { CountriesNowModule } from '../countries-now/countries-now.module';
import { DatenagerModule } from '../date-nager/datenager.module';
import { MixedIntegrationController } from './mixed-integration.controller';
import { MixedIntegrationService } from './mixed-integration.service';

@Module({
  imports: [CountriesNowModule, DatenagerModule],
  controllers: [MixedIntegrationController],
  providers: [MixedIntegrationService],
})
export class MixedIntegrationModule {}
