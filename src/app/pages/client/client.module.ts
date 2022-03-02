import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

@NgModule({
  declarations: [ClientComponent],
  imports: [CommonModule, ClientRoutingModule],
  exports: [ClientComponent],
})
export class ClientModule {}
