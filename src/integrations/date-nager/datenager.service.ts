import { HttpService } from '@nestjs/axios';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Country } from '../countries-now/type/countries-now.type';
import { AvailableCountries, Holiday } from './types/datenager.types';

@Injectable()
export class DatenagerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries(): Promise<AvailableCountries[]> {
    const response: AxiosResponse<AvailableCountries[]> = await lastValueFrom(
      this.httpService.get(`${this.configService.get('API_DATE_NAGER')}/AvailableCountries`),
    ).catch((e) => {
      throw new InternalServerErrorException(e);
    });
    return response.data;
  }

  async getCountryInfo(country: string): Promise<Country> {
    const res: AxiosResponse<Country> = await lastValueFrom(
      this.httpService.get(`${this.configService.get('API_DATE_NAGER')}/CountryInfo/${country}`),
    );
    return res.data;
  }

  async getHolidayByYearAndCountryCode({ year, countryCode }: { year: number; countryCode: string }) {
    const res: AxiosResponse<Holiday[]> = await lastValueFrom(
      this.httpService.get(`${this.configService.get('API_DATE_NAGER')}/PublicHolidays/${year}/${countryCode}`),
    );
    return res.data;
  }
}
