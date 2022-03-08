import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityComponent } from 'src/app/pages/city/city.component';
import { ClientComponent } from 'src/app/pages/client/client.component';
import { HomeComponent } from 'src/app/pages/home/home.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'city',
        component: CityComponent,
      },
      {
        path: 'client',
        component: ClientComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export default class AdminRoutingModule {}
