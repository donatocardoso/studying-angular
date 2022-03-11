import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import Client from 'src/app/services/alurapic/clients/dtos/client';
import ClientFilter from 'src/app/services/alurapic/clients/dtos/client.filter';

export interface ClientStoreType {
  clientId: number;
  clients: Client[];
  filters?: ClientFilter;
}

const INITIAL_STATE: ClientStoreType = {
  clientId: 0,
  clients: [],
  filters: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class ClientStoreData extends ComponentStore<ClientStoreType> {
  readonly clientId$ = this.select((state) => state.clientId);
  readonly clients$ = this.select((state) => state.clients);
  readonly filters$ = this.select((state) => state.filters);

  constructor() {
    super(INITIAL_STATE);
  }

  readonly GetStore = () => this.select((state) => state);

  readonly SetClientId = this.updater((state, clientId: number) => ({
    ...state,
    clientId: clientId,
  }));

  readonly SetCities = this.updater((state, clients: Client[]) => ({
    ...state,
    clients: clients,
  }));

  readonly SetFilters = this.updater((state, filters: ClientFilter) => ({
    ...state,
    filters: filters,
  }));
}
