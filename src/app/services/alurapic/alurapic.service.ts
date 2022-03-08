import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlockedService } from './bloked/blocked.service';
import { CityService } from './cities/city.service';
import { ClientService } from './clients/client.service';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AluraPicService {
  Blocked: BlockedService;
  City: CityService;
  Client: ClientService;
  User: UserService;

  constructor() {
    const { baseUrl } = environment.alurapic;

    this.Blocked = new BlockedService(baseUrl);
    this.City = new CityService(baseUrl);
    this.Client = new ClientService(baseUrl);
    this.User = new UserService(baseUrl);
  }
}
