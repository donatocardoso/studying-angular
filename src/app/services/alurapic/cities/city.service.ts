import moment from 'moment';
import CityFilter from 'src/app/services/alurapic/cities/dtos/city.filter';
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

    return ApiReturn.Success('Sucesso', (await response.json()) as City[]);
  }

  public async GetByFilter(filters: CityFilter): Promise<IApiReturn<City[]>> {
    const params = new URLSearchParams(JSON.parse(JSON.stringify(filters)));

    const response = await fetch(
      `${this.baseURL}/cities?${params.toString()}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', (await response.json()) as City[]);
  }

  public async GetById(id: number): Promise<IApiReturn<City>> {
    const response = await fetch(`${this.baseURL}/cities/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    const cities = (await response.json()) as City[];

    return ApiReturn.Success('Sucesso', cities[0]);
  }

  public async Post(city: City): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/cities`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...city,
        createdAt: moment().toISOString(true),
        updatedAt: moment().toISOString(true),
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
        updatedAt: moment().toISOString(true),
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
