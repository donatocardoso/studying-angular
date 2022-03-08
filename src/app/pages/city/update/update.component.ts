import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
import { CityStore } from '../city.component';

@Component({
  selector: 'update-city-modal',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less'],
})
export class UpdateComponent implements OnInit {
  @Output() onRefreshCityList: EventEmitter<any> = new EventEmitter();

  public city!: City;

  constructor(private readonly aluraPicService: AluraPicService) {}

  ngOnInit(): void {
    CityStore.cityId$.subscribe({
      next: (cityId) => {
        if (!cityId) return;

        this.aluraPicService.City.GetById(cityId)
          .then((response) => {
            if (!response.IsSuccess || !response.Content) {
              Alert.Danger('Fail to recovery the city');
              return;
            }

            this.city = response.Content;
          })
          .catch((error) => Alert.Danger(error.message));
      },
    });
  }

  Save(): void {
    if (!this.city.id) {
      Alert.Warning('Invalid City :(');
      return;
    }

    if (!this.city.name) {
      Alert.Warning('Please, enter with City Name');
      return;
    }

    if (!this.city.state) {
      Alert.Warning('Please, enter with a State');
      return;
    }

    if (!this.city.country) {
      Alert.Warning('Please, enter with a Country');
      return;
    }

    this.aluraPicService.City.Put(this.city.id, this.city)
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger(response.Message);
          return;
        }

        document.getElementById('BtnCloseUpdateCityModal')?.click();

        this.onRefreshCityList.emit();

        Alert.Success(`Save the city ${this.city.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger("Don't save city, an error has occurred :(");
      });
  }
}
