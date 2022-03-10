import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/app.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
})
export class MenuComponent {
  @Input() baseUrl!: string;

  constructor(private readonly router: Router) {}

  public Logout(): void {
    AppStore.Logout();
    this.router.navigate(['/login']);
  }
}
