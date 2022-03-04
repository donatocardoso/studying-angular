import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BlockedService } from './bloked/blocked.service';
import { UserService } from './users/user.service';

@Injectable({
  providedIn: 'root',
})
export class AluraPicService {
  Blocked: BlockedService;
  User: UserService;

  constructor() {
    const { baseUrl } = environment.alurapic;

    this.Blocked = new BlockedService(baseUrl);
    this.User = new UserService(baseUrl);
  }
}
