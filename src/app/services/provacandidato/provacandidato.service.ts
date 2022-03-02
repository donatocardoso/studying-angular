import { Injectable } from '@angular/core';
import { CidadeService } from './cidade/cidade.service';
import { ICidadeService } from './cidade/icidade.service';
import { ClienteService } from './cliente/cliente.service';
import { IClienteService } from './cliente/icliente.service';

@Injectable({
  providedIn: 'root',
})
export class ProvaCandidatoService {
  public readonly Cidade: ICidadeService;
  public readonly Cliente: IClienteService;

  constructor() {
    const baseURL = 'http://localhost:5051';

    this.Cidade = new CidadeService(baseURL);
    this.Cliente = new ClienteService(baseURL);
  }
}
