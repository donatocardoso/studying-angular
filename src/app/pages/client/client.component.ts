import { Component, OnInit } from '@angular/core';
import moment from 'moment';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import Client from 'src/app/services/alurapic/clients/dtos/client';
import ClientFilter from 'src/app/services/alurapic/clients/dtos/client.filter';
import { ClientStoreData } from './client.store';

export const ClientStore = new ClientStoreData();

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less'],
})
export class ClientComponent implements OnInit {
  public appStore: AppStoreData = AppStore;

  public clients: Client[];

  constructor(private readonly aluraPicService: AluraPicService) {
    this.clients = [];
  }

  public ngOnInit(): void {
    this.RefreshClientList();
  }

  public RefreshClientList(): void {
    ClientStore.filters$.subscribe({
      next: async (filters) => {
        console.log(filters);

        const cities = filters
          ? await this.aluraPicService.Client.GetByFilter(filters)
          : await this.aluraPicService.Client.GetAll();

        if (!cities.IsSuccess) {
          Alert.Danger('Fail to recovery the cities');
          return;
        }

        this.clients = cities.Content ?? [];
      },
    });
  }

  public Filter(filters: ClientFilter): void {
    console.log(filters);
    ClientStore.SetFilters({
      id: filters.id ? filters.id : undefined,
      name_like: filters.name_like ? filters.name_like : undefined,
      cityId: filters.cityId && parseInt(filters.cityId) ? filters.cityId : undefined,
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

  public EditClient(id?: number): void {
    ClientStore.SetClientId(id ?? 0);
    document.getElementById('BtnOpenUpdateClientModal')?.click();
  }

  public DeleteClient(id?: number): void {
    ClientStore.SetClientId(id ?? 0);
    document.getElementById('BtnOpenDeleteClientModal')?.click();
  }
}
