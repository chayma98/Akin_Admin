import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { ListClientsComponent } from './list-clients/list-clients.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ListClientsComponent],
  imports: [
    CommonModule,
    ClientRoutingModule, 
    FormsModule, 
    Ng2SearchPipeModule
    ]
})
export class ClientModule { }
