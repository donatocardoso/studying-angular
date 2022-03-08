import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppGuard } from './app.guard';
import { LoginGuard } from './layouts/login/login.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    canLoad: [LoginGuard],
    loadChildren: () =>
      import('./layouts/login/login.module').then((m) => m.LoginLayoutModule),
  },
  {
    path: 'admin',
    canLoad: [AppGuard],
    loadChildren: () =>
      import('./layouts/admin/admin.module').then((m) => m.AdminLayoutModule),
  },
  {
    path: 'user',
    canLoad: [AppGuard],
    loadChildren: () =>
      import('./layouts/user/user.module').then((m) => m.UserLayoutModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
