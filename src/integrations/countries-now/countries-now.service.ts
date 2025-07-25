import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { lastValueFrom } from 'rxjs';
import { Flag, PopulationCountry } from './type/countries-now.type';

@Injectable()
export class CountriesNowService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAllPopulation(): Promise<PopulationCountry[]> {
    const res: AxiosResponse<{ data: PopulationCountry[] }> = await lastValueFrom(
      this.httpService.get(`${this.configService.get('API_COUNTRIES_NOW')}/countries/population`),
    );
    return res.data.data;
  }

  async getAllCountriesFlag(): Promise<Flag[]> {
    const res: AxiosResponse<{ data: Flag[] }> = await lastValueFrom(
      this.httpService.get(`${this.configService.get('API_COUNTRIES_NOW')}/countries/flag/images`),
    );
    return res.data.data;
  }
}
