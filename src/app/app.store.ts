import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import UserType from './enums/UserType';
import User from './services/alurapic/users/dtos/user';

export interface AppStoreType {
  isLogged: boolean;
  isAdmin: boolean;
  isUser: boolean;

  user?: User;
}

const INITIAL_STATE: AppStoreType = {
  isLogged: false,
  isAdmin: false,
  isUser: false,

  user: undefined,
};

@Injectable({
  providedIn: 'root',
})
export class AppStoreData extends ComponentStore<AppStoreType> {
  readonly isLogged$ = this.select((state) => state.isLogged);
  readonly isAdmin$ = this.select((state) => state.isAdmin);
  readonly isUser$ = this.select((state) => state.isUser);

  constructor() {
    super(INITIAL_STATE);
  }

  readonly GetStore = () => this.select((state) => state);

  readonly Login = this.updater((state, user: User) => {
    const newState = {
      ...state,
      isLogged: true,
      isAdmin: user.userType === UserType.Admin,
      isUser: user.userType === UserType.User,

      user: user,
    };

    localStorage.setItem('alurapic', JSON.stringify(newState));

    return newState;
  });

  readonly Logout = this.updater((state) => {
    localStorage.removeItem('alurapic');

    return INITIAL_STATE;
  });
}
