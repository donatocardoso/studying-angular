import { IClienteService } from './icliente.service';

export class ClienteService implements IClienteService {
  constructor(private baseURL: string) {}

  GetAll(): void {
    throw new Error('Method not implemented.');
  }

  GetByCodigo(codigo: number): void {
    throw new Error('Method not implemented.');
  }

  GetByNome(nome: string): void {
    throw new Error('Method not implemented.');
  }

  Post(): void {
    throw new Error('Method not implemented.');
  }

  Put(): void {
    throw new Error('Method not implemented.');
  }

  Delete(): void {
    throw new Error('Method not implemented.');
  }
}
