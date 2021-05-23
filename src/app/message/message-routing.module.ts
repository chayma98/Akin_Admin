import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListMessageComponent } from './list-message/list-message.component';
import { RepondreMessageComponent } from './repondre-message/repondre-message.component';


const routes: Routes = [ 
  {path:'all', component: ListMessageComponent},  
  {path:'rep/:id', component: RepondreMessageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
