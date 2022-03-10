import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import City from 'src/app/services/alurapic/cities/dtos/city';
import CityFilter from 'src/app/services/alurapic/cities/dtos/city.filter';

export interface CityStoreType {
  cityId: number;
  cities: City[];
  filters?: CityFilter;
}

const INITIAL_STATE: CityStoreType = {
  cityId: 0,
  cities: [],
  filters: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class CityStoreData extends ComponentStore<CityStoreType> {
  readonly cityId$ = this.select((state) => state.cityId);
  readonly cities$ = this.select((state) => state.cities);
  readonly filters$ = this.select((state) => state.filters);

  constructor() {
    super(INITIAL_STATE);
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

  readonly SetFilters = this.updater((state, filters: CityFilter) => ({
    ...state,
    filters: filters,
  }));
}
