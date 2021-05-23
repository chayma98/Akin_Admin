import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { CommandeRoutingModule } from './commande-routing.module';
import { ListCommandeComponent } from './list-commande/list-commande.component';
import { LigneCmdComponent } from './ligne-cmd/ligne-cmd.component';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ListCommandeComponent, LigneCmdComponent],
  imports: [
    CommonModule,
    CommandeRoutingModule, 
    FormsModule, 
    Ng2SearchPipeModule
  ]
})
export class CommandeModule { }
