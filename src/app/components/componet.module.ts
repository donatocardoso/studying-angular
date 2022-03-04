import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { AlertComponent } from './alert/alert.component';
import { AlertStore } from './alert/alert.store';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [
    MenuComponent,
    FooterComponent,
    AlertComponent,
    PhotoComponent,
  ],
  imports: [CommonModule],
  providers: [ComponentStore, AlertStore],
  exports: [MenuComponent, FooterComponent, AlertComponent, PhotoComponent],
})
export class ComponentModule {}
