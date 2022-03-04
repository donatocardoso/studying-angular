import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IfConfigMeService {
  constructor() {}

  public async AllJson(): Promise<Response> {
    return fetch(`${environment.ifconfigme.baseUrl}/all.json`);
  }
}
