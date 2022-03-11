import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import City from 'src/app/services/alurapic/cities/dtos/city';
import Client from 'src/app/services/alurapic/clients/dtos/client';
import { ClientStore } from '../client.component';

@Component({
  selector: 'update-client-modal',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.less'],
})
export class UpdateComponent implements OnInit {
  @Output() onRefreshClientList: EventEmitter<any> = new EventEmitter();

  public client: Client;
  public cities: City[];

  constructor(private readonly aluraPicService: AluraPicService) {
    this.client = {} as Client;
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

    ClientStore.clientId$.subscribe({
      next: (clientId) => {
        if (!clientId) return;

        this.aluraPicService.Client.GetById(clientId)
          .then((response) => {
            if (!response.IsSuccess || !response.Content) {
              Alert.Danger('Fail to recovery the client');
              return;
            }

            this.client = response.Content;
          })
          .catch((error) => Alert.Danger(error.message));
      },
    });
  }

  onCityChange(event: EventTarget | null): void {
    if (event) {
      const select = event as HTMLSelectElement;

      this.client.cityId = parseInt(select.value);
      this.client.city = this.cities.find((it) => it.id === parseInt(select.value));
    }
  }

  Save(): void {
    if (!this.client.id) {
      Alert.Warning('Invalid Client :(');
      return;
    }

    if (!this.client.name) {
      Alert.Warning('Please, enter with Client Name');
      return;
    }

    if (!this.client.cityId) {
      Alert.Warning('Please, enter with a State');
      return;
    }

    if (!this.client.city) {
      Alert.Warning('Please, enter with a valid City');
      return;
    }

    this.aluraPicService.Client.Put(this.client.id, this.client)
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger(response.Message);
          return;
        }

        document.getElementById('BtnCloseUpdateClientModal')?.click();

        this.onRefreshClientList.emit();

        Alert.Success(`Save the client ${this.client.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger("Don't save client, an error has occurred :(");
      });
  }
}
