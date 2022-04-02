import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DoBootstrap,
  EventEmitter,
  Injector,
  Input,
  NgModule,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { Country, CountryList } from '@fh-sfr-frontend/util-types';

@Component({
  selector: 'ui-autocomplete-elements',
  template: `
    <link
      href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
      rel="stylesheet"
      integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
      crossorigin="anonymous"
    />
    <div class="autocomplete">
      <label class="form-label" for="country-input">Select your country:</label>
      <input
        class="form-control"
        id="country-input"
        type="text"
        name="country"
        placeholder="Country"
        list="country-list"
        #inputElement
        (blur)="handleOnBlur(inputElement.value)"
      />

      <datalist id="country-list">
        <option *ngFor="let country of countries">{{ country.name }}</option>
      </datalist>
    </div>
  `,
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutoCompleteComponent {
  @Input() countries!: CountryList;
  @Output() onBlur = new EventEmitter<Country>();

  private _currentCountry!: Country;

  constructor() {}

  handleOnBlur(value: string) {
    this._currentCountry = { name: value };
    this.onBlur.emit(this._currentCountry);
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [AutoCompleteComponent],
  entryComponents: [AutoCompleteComponent],
})
export class AutoCompleteComponentModule implements DoBootstrap {
  constructor(private _injector: Injector) {}

  ngDoBootstrap(): void {
    const webComponent = createCustomElement(AutoCompleteComponent, { injector: this._injector });
    customElements.define('ui-autocomplete-angular-web-component', webComponent);
  }
}
