import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { LigneCmdComponent } from './ligne-cmd/ligne-cmd.component';


const routes: Routes = [ 
  {path:'all', component: ListCommandeComponent}, 
  {path:'info/:id', component: LigneCmdComponent} 
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommandeRoutingModule { }
