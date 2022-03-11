import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';
import { AddComponent } from './add/add.component';
import { ClientComponent } from './client.component';
import { DeleteComponent } from './delete/delete.component';
import { FilterComponent } from './filter/filter.component';
import { UpdateComponent } from './update/update.component';

@NgModule({
  declarations: [
    ClientComponent,
    AddComponent,
    UpdateComponent,
    DeleteComponent,
    FilterComponent,
  ],
  imports: [CommonModule, FormsModule, NgxMaskModule.forRoot()],
  exports: [ClientComponent],
})
export class ClientModule {}
