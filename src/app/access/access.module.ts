import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessRoutingModule } from './access-routing.module';
import { AjoutAccessComponent } from './ajout-access/ajout-access.component';
import { ListtAccessComponent } from './listt-access/listt-access.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AjoutAccessComponent, ListtAccessComponent],
  imports: [
    CommonModule,
    AccessRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    Ng2SearchPipeModule
  ]
})
export class AccessModule { }
