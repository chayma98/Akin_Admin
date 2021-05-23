import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiCommandeService } from 'src/app/services/api-commande.service'; 
@Component({
  selector: 'app-list-commande',
  templateUrl: './list-commande.component.html',
  styleUrls: ['./list-commande.component.css']
})
export class ListCommandeComponent implements OnInit { 
  commandes:any =[];
  term: string;
  constructor(private service:ApiCommandeService, private toastr: ToastrService) { }

  ngOnInit(): void {  
    this.getCommandes();
  }


  getCommandes(){
      this.service.allCommande().subscribe(data=>{
        this.commandes = data; 
      }, error=>{
        console.log("erreur  : "+error);
      })
  }

  traiterCmd(id, etat){
    console.log("etatt  : "+etat);
    console.log("iddd  : "+id);
    this.service.editCommande(id, etat).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.commandes =[];
        this.getCommandes();
      }
      
    }, error=>{
      console.log("erreur  : "+error);
    })
  }

}
