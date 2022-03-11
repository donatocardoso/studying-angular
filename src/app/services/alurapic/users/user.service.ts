import moment from 'moment';
import UserType from 'src/app/enums/UserType';
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

    return ApiReturn.Success('Sucesso', (await response.json()) as User[]);
  }

  public async GetById(id: number): Promise<IApiReturn<User>> {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', (await response.json()) as User);
  }

  public async GetByUserName(username: string): Promise<IApiReturn<User[]>> {
    const params = new URLSearchParams({ username });

    const response = await fetch(`${this.baseURL}/users?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso', (await response.json()) as User[]);
  }

  public async GetByUserNameAndPassword(
    username: string,
    password: string
  ): Promise<IApiReturn<User>> {
    const params = new URLSearchParams({ username, password });

    const response = await fetch(`${this.baseURL}/users?${params.toString()}`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    const users = (await response.json()) as User[];

    if (!users.length) return ApiReturn.Fail('Username and/or password wrong');

    return ApiReturn.Success('Sucesso', users[0]);
  }

  public async Post(user: User): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        userType: UserType.User,
        createdAt: moment().toISOString(true),
        updatedAt: moment().toISOString(true),
      }),
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.Success('Sucesso');
  }

  public async Put(id: number, user: User): Promise<IApiReturn> {
    const response = await fetch(`${this.baseURL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...user,
        updatedAt: moment().toISOString(true),
      }),
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
