import { Component, OnInit } from '@angular/core';
import { ProvaCandidatoService } from 'src/app/services/provacandidato/provacandidato.service';

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less'],
})
export class ClientComponent implements OnInit {
  constructor(private apiProvaCandidatoService: ProvaCandidatoService) {}

  ngOnInit(): void {
    const clientes = this.apiProvaCandidatoService.Cliente.GetAll();

    console.log(clientes);
  }
}
