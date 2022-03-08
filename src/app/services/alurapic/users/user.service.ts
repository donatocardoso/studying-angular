import ApiReturn, { IApiReturn } from '../api.return';
import User from './dtos/user';

export class UserService {
  constructor(private baseURL: string) {}

  public async GetAll(): Promise<IApiReturn<User[]>> {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetById(id: number): Promise<IApiReturn<User>> {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetByUserName(username: string): Promise<IApiReturn<User[]>> {
    const response = await fetch(`${this.baseURL}/users?username=${username}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async GetByUserNameAndPassword(
    username: string,
    password: string
  ): Promise<IApiReturn<User>> {
    const response = await fetch(
      `${this.baseURL}/users?username=${username}&password=${password}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', await response.json());
  }

  public async Post(user: User): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, user: User): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Delete(id: number): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }
}
