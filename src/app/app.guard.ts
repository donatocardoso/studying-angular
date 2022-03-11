import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/app.component';
import { AppStoreType } from './app.store';

@Injectable({
  providedIn: 'root',
})
export class AppGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const fullPath = `/${segments.map((segment) => segment.path).join('/')}`;

    return new Promise<boolean>((resolve, reject) => {
      AppStore.GetStore().subscribe({
        next: (store) => {
          const isRedirected = this.tryRedirectToLogin(fullPath, store);

          if (isRedirected) return resolve(false);

          console.log('app.guard.ts', 35, fullPath);
          console.log(store);

          if (store.isAdmin) {
            if (fullPath.startsWith('/admin')) return resolve(true);

            return resolve(false);
          }

          if (store.isUser) {
            if (fullPath.startsWith('/user')) return resolve(true);

            return resolve(false);
          }
        },
        error: (err) => reject(err),
      });
    });
  }

  tryRedirectToLogin(fullPath: string, store: AppStoreType): boolean {
    if (!store.isLogged) {
      const alurapic = localStorage.getItem('alurapic');

      if (alurapic) {
        const store = JSON.parse(alurapic) as AppStoreType;

        if (store.user) AppStore.Login(store.user);

        return this.tryRedirectToLogin(fullPath, store);
      }

      this.router.navigate(['/login']);

      return true;
    }

    return false;
  }
}
