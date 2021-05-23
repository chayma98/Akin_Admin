import { Component, OnInit } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-list-clients',
  templateUrl: './list-clients.component.html',
  styleUrls: ['./list-clients.component.css']
})
export class ListClientsComponent implements OnInit {
  clients:any =[];
  term: string;
  constructor(private service:ApiClientService, private toastr: ToastrService) { }
  
  ngOnInit(): void {   
    this.getClients();
  }


  getClients(){
      this.service.allClient().subscribe(data=>{
        this.clients = data; 
      }, error=>{
        console.log("erreur  : "+error);
      })
  }

  traiterClient(id, etat){
    console.log("etattt : "+etat);
    this.service.editClient(id, etat).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.clients =[];
        this.getClients();
      }
      
    }, error=>{
      console.log("erreur  : "+error);
    })

  }

  
}