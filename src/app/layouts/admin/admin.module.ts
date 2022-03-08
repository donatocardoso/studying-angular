import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentModule } from 'src/app/components/componet.module';
import { HomeModule } from 'src/app/pages/home/home.module';
import AdminRoutingModule from './admin-routing.module';
import { AdminLayout } from './admin.layout';

@NgModule({
  declarations: [AdminLayout],
  imports: [CommonModule, ComponentModule, AdminRoutingModule, HomeModule],
  exports: [AdminLayout],
})
export class AdminLayoutModule {}
