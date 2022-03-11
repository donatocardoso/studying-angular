import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';

@Component({
  selector: 'add-client-modal',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.less'],
})
export class AddComponent implements OnInit {
  @Output() onRefreshClientList: EventEmitter<any> = new EventEmitter();

  public name: string = '';
  public cityId: number = 0;

  public cities: City[] = [];

  constructor(private readonly aluraPicService: AluraPicService) {}

  ngOnInit(): void {
    this.aluraPicService.City.GetAll()
      .then((response) => {
        if (!response.IsSuccess || !response.Content) {
          Alert.Danger(response.Message);
          return;
        }

        this.cities = response.Content;
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger("Don't find any city :(");
      });
  }

  onCityChange(event: EventTarget | null): void {
    if (event) {
      const select = event as HTMLSelectElement;

      this.cityId = parseInt(select.value);
    }
  }

  Save(): void {
    if (!this.name) {
      Alert.Warning('Please, enter with Client Name');
      return;
    }

    if (!this.cityId) {
      Alert.Warning('Please, enter with a City');
      return;
    }

    const city = this.cities.find((it) => it.id === this.cityId);

    if (!city) {
      Alert.Warning('Please, enter with a valid City');
      return;
    }

    this.aluraPicService.Client.Post({
      name: this.name,
      cityId: this.cityId,
      city: city,
    })
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger(response.Message);
          return;
        }

        document.getElementById('BtnCloseAddClientModal')?.click();

        this.onRefreshClientList.emit();

        Alert.Success(`Save the client ${this.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger("Don't save client, an error has occurred :(");
      });
  }
}
