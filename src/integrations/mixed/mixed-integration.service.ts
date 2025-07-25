import { Injectable } from '@nestjs/common';
import { iso2to3 } from '../../infrastructure/utils/iso2toiso3';
import { CountriesNowService } from '../countries-now/countries-now.service';
import { Country, Flag, PopulationCountry } from '../countries-now/type/countries-now.type';
import { DatenagerService } from '../date-nager/datenager.service';

@Injectable()
export class MixedIntegrationService {
  constructor(
    private readonly dateNagerService: DatenagerService,
    private readonly countriesNowService: CountriesNowService,
  ) {}

  async getCountryInfo(country: string) {
    const [info, allPopulations, allFlagImages]: [Country, PopulationCountry[], Flag[]] = await Promise.all([
      this.dateNagerService.getCountryInfo(country),
      this.countriesNowService.getAllPopulation(),
      this.countriesNowService.getAllCountriesFlag(),
    ]);

    const countryIso3 = iso2to3(country);
    const population = allPopulations.find((population) => population.iso3 === countryIso3);
    const flag = allFlagImages.find((f) => f.iso3 === countryIso3).flag;

    return { info, population, flag };
  }
}
