import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import moment from 'moment';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
import ClientFilter from 'src/app/services/alurapic/clients/dtos/client.filter';

@Component({
  selector: 'filter-client-modal',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
})
export class FilterComponent implements OnInit {
  @Output() onFilterClientList: EventEmitter<ClientFilter> = new EventEmitter();

  public client: ClientFilter;
  public cities: City[];

  constructor(private readonly aluraPicService: AluraPicService) {
    this.client = {
      id: '',
      name_like: '',
      cityId: '',
      createdAt_gte: '',
      updatedAt_gte: '',
    };

    this.cities = [];
  }

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

      this.client.cityId = select.value;
    }
  }

  Filter(): void {
    if (
      this.client.createdAt_gte &&
      !moment(this.client.createdAt_gte).isValid()
    ) {
      Alert.Warning('Enter with a valid date');
      return;
    }

    if (
      this.client.updatedAt_gte &&
      !moment(this.client.updatedAt_gte).isValid()
    ) {
      Alert.Warning('Enter with a valid date');
      return;
    }

    document.getElementById('BtnCloseFilterClientModal')?.click();

    this.onFilterClientList.emit(this.client);
  }
}
