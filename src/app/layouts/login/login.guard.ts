import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/app.component';
import { AppStoreType } from 'src/app/app.store';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import Blocked from 'src/app/services/alurapic/bloked/dtos/blocked';
import { IfConfigMeService } from 'src/app/services/ifconfig.me/ifconfig.me.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  constructor(
    private router: Router,
    private ifConfigMeService: IfConfigMeService,
    private aluraPicService: AluraPicService
  ) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const fullPath = `/${segments.map((segment) => segment.path).join('/')}`;

    return new Promise((resolve, reject) => {
      AppStore.GetStore().subscribe({
        next: async (store) => {
          // isLogged
          const isRedirected = this.tryRedirectToHome(fullPath, store);

          if (isRedirected) return resolve(false);

          // check bloked ips
          const networkip = await this.getNetworkIP();

          if (!networkip) return resolve(false);

          const hasBlocked = await this.getBlockedIP(networkip);

          // your ip is blocked
          if (hasBlocked.length) {
            if (fullPath !== '/login/blocked') {
              this.router.navigate(['/login/blocked']);

              return resolve(false);
            }

            return resolve(true);
          }

          return resolve(true);
        },
        error: (err) => reject(err),
      });
    });
  }

  tryRedirectToHome(fullPath: string, store: AppStoreType): boolean {
    console.log(store);
    if (store.isLogged) {
      if (store.isAdmin) {
        this.router.navigate(['/admin/home']);

        return true;
      }

      if (store.isUser) {
        this.router.navigate(['/user/home']);

        return true;
      }
    } else {
      const alurapic = localStorage.getItem('alurapic');

      if (alurapic) {
        const store = JSON.parse(alurapic) as AppStoreType;

        if (store.user) AppStore.Login(store.user);

        return this.tryRedirectToHome(fullPath, store);
      }
    }

    return false;
  }

  async getNetworkIP(): Promise<string> {
    const config = await this.ifConfigMeService.AllJson();

    if (!config.ok) return '';

    const networkip = (await config.json())['ip_addr'];

    return networkip;
  }

  async getBlockedIP(networkip: string): Promise<Blocked[]> {
    const block = await this.aluraPicService.Blocked.GetByNetworkIP(networkip);

    if (!block.IsSuccess || !block.Content) return [];

    return block.Content.filter((it) => {
      const diffMinutes = moment().diff(it.createdAt, 'minutes');

      return diffMinutes < 5;
    });
  }
}
