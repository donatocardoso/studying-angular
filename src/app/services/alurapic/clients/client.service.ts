import ApiReturn, { IApiReturn } from '../api.return';
import Client from './dtos/client';

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
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, client: Client): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/clients/${id}`, {
      method: 'PUT',
      body: JSON.stringify(client),
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
