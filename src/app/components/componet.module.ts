import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { AlertComponent } from './alert/alert.component';
import { AlertStore } from './alert/alert.store';

@NgModule({
  declarations: [MenuComponent, FooterComponent, AlertComponent],
  imports: [CommonModule, RouterModule],
  providers: [ComponentStore, AlertStore],
  exports: [MenuComponent, FooterComponent, AlertComponent],
})
export class ComponentModule {}
