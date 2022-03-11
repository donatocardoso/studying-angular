import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import Client from 'src/app/services/alurapic/clients/dtos/client';
import { ClientStore } from '../client.component';

@Component({
  selector: 'delete-client-modal',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.less'],
})
export class DeleteComponent implements OnInit {
  @Output() onRefreshClientList: EventEmitter<any> = new EventEmitter();

  public client: Client;

  constructor(private readonly aluraPicService: AluraPicService) {
    this.client = {} as Client;
  }

  ngOnInit(): void {
    ClientStore.clientId$.subscribe({
      next: (clientId) => {
        if (!clientId) return;

        this.aluraPicService.Client.GetById(clientId)
          .then((response) => {
            if (!response.IsSuccess || !response.Content) {
              Alert.Danger('Fail to recovery the client');
              return;
            }

            this.client = response.Content;
          })
          .catch((error) => Alert.Danger(error.message));
      },
    });
  }

  public Delete(): void {
    this.aluraPicService.Client.Delete(this.client.id ?? 0)
      .then((response) => {
        if (!response.IsSuccess) {
          Alert.Danger('Fail to delete client');
          return;
        }

        document.getElementById('BtnCloseDeleteClientModal')?.click();

        this.onRefreshClientList.emit();

        Alert.Success(`Delete the client ${this.client.name} successfully ;)`);
      })
      .catch((error) => {
        console.error(error);
        Alert.Danger(error.message);
      });
  }
}
