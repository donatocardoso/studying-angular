import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FooterComponent } from 'src/app/components/footer/footer.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { PhotoComponent } from './photo/photo.component';

@NgModule({
  declarations: [MenuComponent, FooterComponent, PhotoComponent],
  imports: [CommonModule],
  exports: [MenuComponent, FooterComponent, PhotoComponent],
})
export class ComponentModule {}
