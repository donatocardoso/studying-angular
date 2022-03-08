import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import City from 'src/app/services/alurapic/cities/dtos/city';

export interface CityStoreType {
  cityId: number;
  cities: City[];
}

@Injectable({
  providedIn: 'root',
})
export class CityStoreData extends ComponentStore<CityStoreType> {
  readonly cityId$ = this.select((state) => state.cityId);
  readonly cities$ = this.select((state) => state.cities);

  constructor() {
    super({
      cityId: 0,
      cities: [],
    });
  }

  readonly GetStore = () => this.select((state) => state);

  readonly SetCityId = this.updater((state, cityId: number) => ({
    ...state,
    cityId: cityId,
  }));

  readonly SetCities = this.updater((state, cities: City[]) => ({
    ...state,
    cities: cities,
  }));
}
