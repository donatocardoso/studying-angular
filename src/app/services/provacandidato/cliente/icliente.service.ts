export interface IClienteService {
  GetAll(): void;
  GetByCodigo(codigo: number): void;
  GetByNome(nome: string): void;
  Post(): void;
  Put(): void;
  Delete(): void;
}
