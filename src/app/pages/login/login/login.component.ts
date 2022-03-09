import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppStore } from 'src/app/app.component';
import { AppStoreData } from 'src/app/app.store';
import { Alert } from 'src/app/components/alert/alert.component';
import UserType from 'src/app/enums/UserType';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
  public appStore: AppStoreData = AppStore;

  public username: string = '';
  public password: string = '';

  constructor(
    private readonly router: Router,
    private readonly aluraPicService: AluraPicService
  ) {}

  public Authenticator(): void {
    this.aluraPicService.User.GetByUserNameAndPassword(
      this.username,
      this.password
    )
      .then((response) => {
        if (!response.IsSuccess || !response.Content) {
          Alert.Danger(response.Message);
          return;
        }

        this.appStore.Login(response.Content);

        switch (response.Content.user_type) {
          case UserType.Admin:
            this.router.navigate(['/admin/home']);
            break;

          case UserType.User:
            this.router.navigate(['/user/home']);
            break;

          default:
            this.router.navigate(['/user/home']);
        }
      })
      .catch((error) => Alert.Danger('Username and/or password is incorrect'));
  }
}
