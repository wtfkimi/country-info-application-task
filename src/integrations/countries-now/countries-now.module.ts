import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CountriesNowController } from './countries-now.controller';
import { CountriesNowService } from './countries-now.service';

@Module({
  imports: [HttpModule],
  controllers: [CountriesNowController],
  providers: [CountriesNowService],
  exports: [CountriesNowService],
})
export class CountriesNowModule {}
