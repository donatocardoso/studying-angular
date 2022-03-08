import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export interface AppStoreType {
  isLogged: boolean;
  isAdmin: boolean;
  isUser: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AppStoreData extends ComponentStore<AppStoreType> {
  readonly isLogged$ = this.select((state) => state.isLogged);
  readonly isAdmin$ = this.select((state) => state.isAdmin);
  readonly isUser$ = this.select((state) => state.isUser);

  constructor() {
    super({
      isLogged: true,
      isAdmin: true,
      isUser: false,
    });
  }

  readonly GetStore = () => this.select((state) => state);

  readonly AdminLogin = this.updater((state) => ({
    ...state,
    isLogged: true,
    isAdmin: true,
  }));

  readonly AdminLogout = this.updater((state) => ({
    ...state,
    isLogged: false,
    isAdmin: false,
  }));

  readonly UserLogin = this.updater((state) => ({
    ...state,
    isLogged: true,
    isUser: true,
  }));

  readonly UserLogout = this.updater((state) => ({
    ...state,
    isLogged: false,
    isUser: false,
  }));
}
