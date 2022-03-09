import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  public appStore: AppStoreData = AppStore;

  @Input() baseUrl!: string;

  constructor(private readonly router: Router) {}

  public Logout(): void {
    this.appStore.Logout();
    this.router.navigate(['/login']);
  }
}
