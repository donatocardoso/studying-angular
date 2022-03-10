import { Component, EventEmitter, Output } from '@angular/core';
import moment from 'moment';
import { Alert } from 'src/app/components/alert/alert.component';
import CityFilter from '../../../services/alurapic/cities/dtos/city.filter';

@Component({
  selector: 'filter-city-modal',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less'],
})
export class FilterComponent {
  @Output() onFilterCityList: EventEmitter<CityFilter> = new EventEmitter();

  public city: CityFilter;

  constructor() {
    this.city = {
      id: '',
      name_like: '',
      state_like: '',
      country_like: '',
      createdAt_gte: '',
      updatedAt_gte: '',
    };
  }

  Filter(): void {
    if (this.city.createdAt_gte && !moment(this.city.createdAt_gte).isValid()) {
      Alert.Warning('Enter with a valid date');
      return;
    }

    if (this.city.updatedAt_gte && !moment(this.city.updatedAt_gte).isValid()) {
      Alert.Warning('Enter with a valid date');
      return;
    }

    document.getElementById('BtnCloseFilterCityModal')?.click();

    this.onFilterCityList.emit(this.city);
  }
}
