import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiCountry, CountryList } from '@fh-sfr-frontend/util-types';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  constructor(private _httpClient: HttpClient) {}

  getCountries(): Observable<CountryList> {
    return this._httpClient.get('https://restcountries.com/v3.1/region/europe').pipe(
      map((v: any) => {
        return v.map((v: ApiCountry) => {
          return {
            name: v.name.common,
          };
        });
      })
    );
  }
}
