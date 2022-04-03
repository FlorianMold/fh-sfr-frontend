import { Country, CountryList } from '@fh-sfr-frontend/util-types';

const template = document.createElement('template');
template.innerHTML = `
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
  <div class="autocomplete">
    <label class="form-label" for="country-input">Select your country:</label>
    <input class="form-control" id="country-input" type="text" name="country" placeholder="Country" list="country-list">

    <datalist id="country-list">
    </datalist>
  </div>
`;

export class AutoCompleteWebComponent extends HTMLElement {
  private _countryInputElement!: HTMLInputElement;
  private _datalistElement!: HTMLElement;
  private _countries: CountryList = [];
  private _currentCountry!: Country;

  get countries() {
    return this._countries;
  }

  set countries(countries: CountryList) {
    this._countries = countries;
    this.update(countries);
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Clone our template for every new template.
    this.shadowRoot!.appendChild(template.content.cloneNode(true));

    this._countryInputElement = this.shadowRoot!.getElementById('country-input')! as HTMLInputElement;
    this._datalistElement = this.shadowRoot!.getElementById('country-list')!;

    if (this._countryInputElement) {
      this._countryInputElement.onblur = () => this.handleOnBlur();
    }
  }

  update(countries: CountryList) {
    if (this._datalistElement) {
      this._datalistElement.innerHTML = '';

      countries.forEach((country) => {
        const option = document.createElement('option');
        option.value = country.name;
        this._datalistElement?.appendChild(option);
      });
    }
  }

  handleOnBlur() {
    this._currentCountry = { name: this._countryInputElement.value };
    this.dispatchEvent(new CustomEvent<Country>('onBlur', { detail: this._currentCountry }));
  }
}

customElements.define('ui-autocomplete-web-component', AutoCompleteWebComponent);
