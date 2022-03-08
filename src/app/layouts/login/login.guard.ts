import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import moment from 'moment';
import { Observable } from 'rxjs';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';
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
    return new Promise((resolve, reject) => {
      this.ifConfigMeService
        .AllJson()
        .then(async (config) => {
          if (!config.ok) {
            reject(false);
            return;
          }

          const networkip = (await config.json())['ip_addr'];

          if (!networkip) {
            reject(false);
            return;
          }

          this.aluraPicService.Blocked.GetByNetworkIP(networkip)
            .then((block) => {
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
              return;
            })
            .catch((err) => reject(false));
        })
        .catch((err) => reject(false));
    });
  }
}
