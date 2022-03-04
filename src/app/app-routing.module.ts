import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from './pages/login/login.guard';

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
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'city',
    loadChildren: () =>
      import('./pages/city/city.module').then((m) => m.CityModule),
  },
  {
    path: 'client',
    loadChildren: () =>
      import('./pages/client/client.module').then((m) => m.ClientModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
