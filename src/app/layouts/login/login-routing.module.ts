import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockedComponent } from 'src/app/pages/login/blocked/blocked.component';
import { LoginComponent } from '../../pages/login/login/login.component';
import { SignUpComponent } from '../../pages/login/signup/signup.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: LoginComponent,
      },
      {
        path: 'signup',
        component: SignUpComponent,
      },
      {
        path: 'blocked',
        component: BlockedComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class LoginRoutingModule {}
