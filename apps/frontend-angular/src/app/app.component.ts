import { Component, OnInit } from '@angular/core';
import { Country, CountryList } from '@fh-sfr-frontend/util-types';
import { CountryService } from './country.service';

@Component({
  selector: 'fh-sfr-frontend-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private _countryService: CountryService) {
  }

  countries: CountryList = [];

  currentCountry?: Country | null;

  handleOnBlur(country: Event) {
    const countryName = country as unknown as { detail: { name: string } };
    this.currentCountry = countryName.detail || null;
  }

  ngOnInit() {
    this._countryService.getCountries().subscribe((countries) => {
      this.countries = countries;
    });
  }
}
