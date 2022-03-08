import { Component, OnInit } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import Client from 'src/app/services/alurapic/clients/dtos/client';

@Component({
  selector: 'app-client-component',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.less'],
})
export class ClientComponent implements OnInit {
  public clients: Client[];

  constructor(private readonly aluraPicService: AluraPicService) {
    this.clients = [];
  }

  public ngOnInit(): void {
    this.aluraPicService.Client.GetAll()
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger('Fail to recovery the cities');
          return;
        }

        this.clients = response.Content ?? [];
      })
      .catch((error) => Alert.Danger(error.message));
  }
}
