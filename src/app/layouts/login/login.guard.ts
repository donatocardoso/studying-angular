import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
import { IfConfigMeService } from 'src/app/services/ifconfig.me/ifconfig.me.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanLoad {
  public appStore: AppStoreData = AppStore;

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
    return new Promise((resolve, reject) => {
      this.appStore.GetStore().subscribe({
        next: async (store) => {
          if (store.isLogged) {
            if (store.isAdmin) {
              this.router.navigate(['/admin/home']);
              reject(false);
              return;
            }

            if (store.isUser) {
              this.router.navigate(['/admin/home']);
              reject(false);
              return;
            }
          }

          const config = await this.ifConfigMeService.AllJson();

          if (!config.ok) {
            reject(false);
            return;
          }

          const networkip = (await config.json())['ip_addr'];

          if (!networkip) {
            reject(false);
            return;
          }

          const block = await this.aluraPicService.Blocked.GetByNetworkIP(
            networkip
          );

          if (!block.IsSuccess) {
            reject(false);
            return;
          }

          if (block.Content) {
            const hasBlocked = block.Content.filter((it) => {
              const diffMinutes = moment().diff(it.created_at, 'minutes');

              return diffMinutes < 5;
            });

            if (segments.find((it) => it.path === 'blocked')) {
              if (hasBlocked && hasBlocked.length) {
                resolve(true);
                return;
              }

              this.router.navigate(['/login']);

              reject(false);
              return;
            } else {
              if (hasBlocked && hasBlocked.length) {
                this.router.navigate(['/login/blocked']);

                reject(false);
                return;
              }
            }
          }

          resolve(true);
        },
      });
    });
  }
}
