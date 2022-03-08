import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
import { CityStore } from '../city.component';

@Component({
  selector: 'delete-city-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.less'],
})
export class DeleteComponent implements OnInit {
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

  public Delete(): void {
    this.aluraPicService.City.Delete(this.city.id ?? 0)
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger('Fail to delete city');
          return;
        }

        document.getElementById('BtnCloseDeleteCityModal')?.click();

        this.onRefreshCityList.emit();

        Alert.Success(`Delete the city ${this.city.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger(error.message);
      });
  }
}
