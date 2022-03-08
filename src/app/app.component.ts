import { Component } from '@angular/core';
import { AppStoreData } from './app.store';

export const AppStore = new AppStoreData();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
})
export class AppComponent {
  readonly isLogged$ = AppStore.isLogged$;
  readonly isAdmin$ = AppStore.isAdmin$;
  readonly isUser$ = AppStore.isUser$;
}
