import { IApiReturn } from '../dtos/api.return';
import Cidade from './dtos/cidade';

export interface ICidadeService {
  GetAll(): Promise<IApiReturn<Cidade[]>>;
  GetByCodigo(codigo: number): Promise<IApiReturn<Cidade>>;
  GetByNome(nome: string): Promise<IApiReturn<Cidade>>;
  Post(): Promise<IApiReturn>;
  Put(): Promise<IApiReturn>;
  Delete(): Promise<IApiReturn>;
}
