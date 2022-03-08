import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Alert } from 'src/app/components/alert/alert.component';
import { AluraPicService } from 'src/app/services/alurapic/alurapic.service';

@Component({
  selector: 'app-login-component',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
})
export class LoginComponent {
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
      .then((data) => {
        this.router.navigate(['/user/home']);
      })
      .catch((error) => Alert.Danger('Username and/or password is incorrect'));
  }
}
