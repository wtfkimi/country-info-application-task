import { IsIn } from 'class-validator';
import { iso2countries } from '../../countries-now/type/countries-now.type';

export class GetCountryInfo {
  @IsIn(iso2countries, {
    message:
      'Invalid country code, should be in format iso2 as in docs https://documenter.getpostman.com/view/1134062/T1LJjU52#f5cc53f5-610b-4c7b-bcc6-9baa6e75b295',
  })
  country: string;
}
