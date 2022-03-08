import ApiReturn, { IApiReturn } from '../api.return';
import City from './dtos/city';

export class CityService {
  constructor(private baseURL: string) {}

  public async GetAll(): Promise<IApiReturn<City[]>> {
    const response = await fetch(`${this.baseURL}/cities`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetById(id: number): Promise<IApiReturn<City>> {
    const response = await fetch(`${this.baseURL}/cities/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async Post(city: City): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...city,
        created_at: new Date(),
        updated_at: new Date(),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, city: City): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/cities/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...city,
        updated_at: new Date(),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Delete(id: number): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/cities/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }
}
