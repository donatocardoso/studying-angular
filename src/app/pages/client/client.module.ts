import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientComponent } from './client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule],
  exports: [ClientComponent],
})
export class ClientModule {}
