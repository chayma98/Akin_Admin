import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageRoutingModule } from './message-routing.module';
import { ListMessageComponent } from './list-message/list-message.component';
import { RepondreMessageComponent } from './repondre-message/repondre-message.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [ListMessageComponent, RepondreMessageComponent],
  imports: [
    CommonModule,
    MessageRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    Ng2SearchPipeModule
  ]
})
export class MessageModule { }
