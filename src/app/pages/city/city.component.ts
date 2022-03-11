import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
import CityFilter from '../../services/alurapic/cities/dtos/city.filter';
import { CityStoreData } from './city.store';

export const CityStore = new CityStoreData();

@Component({
  selector: 'app-city-component',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.less'],
})
export class CityComponent implements OnInit {
  public appStore: AppStoreData = AppStore;

  public cities: City[];

  constructor(private readonly aluraPicService: AluraPicService) {
    this.cities = [];
  }

  public ngOnInit(): void {
    this.RefreshCityList();
  }

  public RefreshCityList(): void {
    CityStore.filters$.subscribe({
      next: async (filters) => {
        const cities = filters
          ? await this.aluraPicService.City.GetByFilter(filters)
          : await this.aluraPicService.City.GetAll();

        if (!cities.IsSuccess) {
          Alert.Danger('Fail to recovery the cities');
          return;
        }

        this.cities = cities.Content ?? [];
      },
    });
  }

  public Filter(filters: CityFilter): void {
    CityStore.SetFilters({
      id: filters.id ? filters.id : undefined,
      name_like: filters.name_like ? filters.name_like : undefined,
      state_like: filters.state_like ? filters.state_like : undefined,
      country_like: filters.country_like ? filters.country_like : undefined,
      createdAt_gte: filters.createdAt_gte
        ? moment(filters.createdAt_gte).format('YYYY-MM-DD')
        : undefined,
      createdAt_lte: filters.createdAt_gte
        ? moment(filters.createdAt_gte).add(1, 'day').format('YYYY-MM-DD')
        : undefined,
      updatedAt_gte: filters.updatedAt_gte
        ? moment(filters.updatedAt_gte).format('YYYY-MM-DD')
        : undefined,
      updatedAt_lte: filters.updatedAt_gte
        ? moment(filters.updatedAt_gte).add(1, 'day').format('YYYY-MM-DD')
        : undefined,
    });
  }

  public EditCity(id?: number): void {
    CityStore.SetCityId(id ?? 0);
    document.getElementById('BtnOpenUpdateCityModal')?.click();
  }

  public DeleteCity(id?: number): void {
    CityStore.SetCityId(id ?? 0);
    document.getElementById('BtnOpenDeleteCityModal')?.click();
  }
}
