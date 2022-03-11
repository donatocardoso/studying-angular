import moment from 'moment';
import ApiReturn, { IApiReturn } from '../api.return';
import Blocked from './dtos/blocked';

export class BlockedService {
  constructor(private baseURL: string) {}

  public async GetAll(): Promise<IApiReturn<Blocked[]>> {
    const response = await fetch(`${this.baseURL}/blocked`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetById(id: number): Promise<IApiReturn<Blocked>> {
    const response = await fetch(`${this.baseURL}/blocked/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetByNetworkIP(ip: string): Promise<IApiReturn<Blocked[]>> {
    const response = await fetch(`${this.baseURL}/blocked?networkip=${ip}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async Post(blocked: Blocked): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/blocked`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...blocked,
        createdAt: moment().toISOString(true),
        updatedAt: moment().toISOString(true),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, blocked: Blocked): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/blocked/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...blocked,
        updatedAt: moment().toISOString(true),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Delete(id: number): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/blocked/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }
}
