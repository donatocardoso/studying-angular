import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import UserRoutingModule from './user-routing.module';
import { UserLayout } from './user.layout';

@NgModule({
  declarations: [UserLayout],
  imports: [CommonModule, RouterModule, UserRoutingModule],
  exports: [UserLayout],
})
export class UserLayoutModule {}
