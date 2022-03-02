import ApiReturn, { IApiReturn } from '../dtos/api.return';
import Cidade from './dtos/cidade';
import { ICidadeService } from './icidade.service';

export class CidadeService implements ICidadeService {
  constructor(private baseURL: string) {}

  async GetAll(): Promise<IApiReturn<Cidade[]>> {
    const response = await fetch(`${this.baseURL}/Cidades/GetAll`, {
      method: 'GET',
    });

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.FromObject(await response.json());
  }

  async GetByCodigo(codigo: number): Promise<IApiReturn<Cidade>> {
    const response = await fetch(
      `${this.baseURL}/Cidades/GetByCodigo/${codigo}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.FromObject(await response.json());
  }

  async GetByNome(nome: string): Promise<IApiReturn<Cidade>> {
    const response = await fetch(
      `${this.baseURL}/Cidades/GetByCodigo/${nome}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      return ApiReturn.Fail(response.statusText);
    }

    return ApiReturn.FromObject(await response.json());
  }

  async Post(): Promise<IApiReturn> {
    throw new Error('Method not implemented.');
  }

  async Put(): Promise<IApiReturn> {
    throw new Error('Method not implemented.');
  }

  async Delete(): Promise<IApiReturn> {
    throw new Error('Method not implemented.');
  }
}
