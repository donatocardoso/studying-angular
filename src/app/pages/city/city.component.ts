import { Component, OnInit } from '@angular/core';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
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
    this.aluraPicService.City.GetAll()
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger('Fail to recovery the cities');
          return;
        }

        this.cities = response.Content ?? [];
      })
      .catch((error) => Alert.Danger(error.message));
  }

  public Filter(): void {}

  public EditCity(id?: number): void {
    CityStore.SetCityId(id ?? 0);
    document.getElementById('BtnOpenUpdateCityModal')?.click();
  }

  public DeleteCity(id?: number): void {
    CityStore.SetCityId(id ?? 0);
    document.getElementById('BtnOpenDeleteCityModal')?.click();
  }
}
