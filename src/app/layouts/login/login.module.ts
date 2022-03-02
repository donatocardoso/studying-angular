import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoginModule } from 'src/app/pages/login/login.module';
import LoginRoutingModule from './login-routing.module';
import { LoginLayout } from './login.layout';

@NgModule({
  declarations: [LoginLayout],
  imports: [CommonModule, LoginRoutingModule, LoginModule],
  exports: [LoginLayout],
})
export class LoginLayoutModule {}
