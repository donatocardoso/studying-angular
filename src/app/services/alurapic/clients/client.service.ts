import moment from 'moment';
import ApiReturn, { IApiReturn } from '../api.return';
import Client from './dtos/client';
import ClientFilter from './dtos/client.filter';

export class ClientService {
  constructor(private baseURL: string) {}

  public async GetAll(): Promise<IApiReturn<Client[]>> {
    const response = await fetch(`${this.baseURL}/clients`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetByFilter(
    filters: ClientFilter
  ): Promise<IApiReturn<Client[]>> {
    const params = new URLSearchParams(JSON.parse(JSON.stringify(filters)));

    const response = await fetch(
      `${this.baseURL}/clients?${params.toString()}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', (await response.json()) as Client[]);
  }

  public async GetById(id: number): Promise<IApiReturn<Client>> {
    const response = await fetch(`${this.baseURL}/clients/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async Post(client: Client): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/clients`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...client,
        createdAt: moment().toISOString(true),
        updatedAt: moment().toISOString(true),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, client: Client): Promise<IApiReturn> {
    console.log(client);
    const response = await fetch(`${this.baseURL}/clients/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...client,
        updatedAt: moment().toISOString(true),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Delete(id: number): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/clients/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }
}
