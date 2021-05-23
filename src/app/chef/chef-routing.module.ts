import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutChefComponent } from './ajout-chef/ajout-chef.component';
import { EditChefComponent } from './edit-chef/edit-chef.component';
import { ListChefComponent } from './list-chef/list-chef.component';


const routes: Routes = [
  {path:'add', component: AjoutChefComponent},
  {path:'edit/:id', component: EditChefComponent},
  {path:'all', component: ListChefComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChefRoutingModule { }
