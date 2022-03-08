import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentModule } from 'src/app/components/componet.module';
import { CityModule } from 'src/app/pages/city/city.module';
import { ClientModule } from 'src/app/pages/client/client.module';
import { HomeModule } from 'src/app/pages/home/home.module';
import UserRoutingModule from './user-routing.module';
import { UserLayout } from './user.layout';

@NgModule({
  declarations: [UserLayout],
  imports: [
    CommonModule,
    ComponentModule,
    UserRoutingModule,
    HomeModule,
    CityModule,
    ClientModule,
  ],
  exports: [UserLayout],
})
export class UserLayoutModule {}
