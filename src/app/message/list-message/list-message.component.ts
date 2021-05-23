import { Component, OnInit } from '@angular/core';
import { ApiMessageService } from 'src/app/services/api-message.service';
import { ToastrService } from 'ngx-toastr'; 

@Component({
  selector: 'app-list-message',
  templateUrl: './list-message.component.html',
  styleUrls: ['./list-message.component.css']
})
export class ListMessageComponent implements OnInit { 
  messages:any =[];
  term: string;

  constructor(private service:ApiMessageService, private toastr: ToastrService) { }

  ngOnInit(): void {   
    this.getMessages();
  }


  getMessages(){
      this.service.allMessage().subscribe(data=>{
        this.messages = data; 
      }, error=>{
        console.log("erreur  : "+error);
      })
  }
  suppMsg(id) {
    if(confirm("Voulez-vous vraiment supprimer ce message !?")) {
      this.service.deleteMessage(id).subscribe(data=>{
        if(data["resultat"]=="SUCCESS"){
          this.toastr.success('Suppression effectuée avec succées', 'Success', {timeOut: 3000 });
          this.messages =[];
          this.getMessages();
        }else{
          this.toastr.error('Erreur de Suppression', 'Error', {timeOut: 3000 });
        }
        
      }, error=>{
        console.log("erreur  : "+error);
      })
    }
  }
  }