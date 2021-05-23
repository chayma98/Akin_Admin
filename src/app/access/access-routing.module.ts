import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutAccessComponent } from './ajout-access/ajout-access.component';
import { ListtAccessComponent } from './listt-access/listt-access.component';


const routes: Routes = [
  {path:'add', component: AjoutAccessComponent},
  {path:'all', component: ListtAccessComponent} 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessRoutingModule { }
