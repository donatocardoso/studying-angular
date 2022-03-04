import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';

export type Variant =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'light'
  | 'dark';

export interface AlertStoreType {
  show?: boolean;
  variant: Variant;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class AlertStore extends ComponentStore<AlertStoreType> {
  private show: boolean = false;

  readonly show$ = this.select((state) => state.show);
  readonly variant$ = this.select((state) => state.variant);
  readonly message$ = this.select((state) => state.message);

  constructor() {
    super({
      show: false,
      variant: 'danger',
      message: 'ola',
    });
  }

  readonly Hide = this.updater((state) => {
    this.show = false;

    return {
      ...state,
      show: false,
      variant: 'primary',
      message: '',
    };
  });

  readonly Primary = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'primary',
      message: message,
    };
  });

  readonly Secondary = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'secondary',
      message: message,
    };
  });

  readonly Success = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'success',
      message: message,
    };
  });

  readonly Warning = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'warning',
      message: message,
    };
  });

  readonly Danger = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'danger',
      message: message,
    };
  });

  readonly Info = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'info',
      message: message,
    };
  });

  readonly Light = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'light',
      message: message,
    };
  });

  readonly Dark = this.updater((state, message: string) => {
    if (this.show) return state;

    this.show = true;
    setTimeout(() => this.Hide(), 7000);

    return {
      ...state,
      show: true,
      variant: 'dark',
      message: message,
    };
  });
}
