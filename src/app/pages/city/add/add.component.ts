import { Component, EventEmitter, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';

@Component({
  selector: 'add-city-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent {
  @Output() onRefreshCityList: EventEmitter<any> = new EventEmitter();

  public name: string = '';
  public state: string = '';
  public country: string = '';

  constructor(private readonly aluraPicService: AluraPicService) {}

  Save(): void {
    if (!this.name) {
      Alert.Warning('Please, enter with City Name');
      return;
    }

    if (!this.state) {
      Alert.Warning('Please, enter with a State');
      return;
    }

    if (!this.country) {
      Alert.Warning('Please, enter with a Country');
      return;
    }

    this.aluraPicService.City.Post({
      name: this.name,
      state: this.state,
      country: this.country,
    })
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger(response.Message);
          return;
        }

        document.getElementById('BtnCloseAddCityModal')?.click();

        this.onRefreshCityList.emit();

        Alert.Success(`Save the city ${this.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger("Don't save city, an error has occurred :(");
      });
  }
}
