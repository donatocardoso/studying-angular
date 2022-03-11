import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AddComponent } from './add/add.component';
import { CityComponent } from './city.component';
import { DeleteComponent } from './delete/delete.component';
import { FilterComponent } from './filter/filter.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    CityComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    FilterComponent,
  ],
  imports: [CommonModule, FormsModule, NgxMaskModule.forRoot()],
  exports: [CityComponent],
})
export class CityModule {}
