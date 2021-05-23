import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChefRoutingModule } from './chef-routing.module';
import { AjoutChefComponent } from './ajout-chef/ajout-chef.component';
import { EditChefComponent } from './edit-chef/edit-chef.component';
import { ListChefComponent } from './list-chef/list-chef.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [AjoutChefComponent, EditChefComponent, ListChefComponent],
  imports: [
    CommonModule,
    ChefRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    Ng2SearchPipeModule
  ]
})
export class ChefModule { }
