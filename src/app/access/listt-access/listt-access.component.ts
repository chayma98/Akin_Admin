import { Component, OnInit } from '@angular/core';
import { ApiAccessService } from 'src/app/services/api-access.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-listt-access',
  templateUrl: './listt-access.component.html',
  styleUrls: ['./listt-access.component.css']
})
export class ListtAccessComponent implements OnInit { 
  access:any =[];
  term: string;
  constructor(private service:ApiAccessService, private toastr: ToastrService) { }

  ngOnInit(): void { 
    this.getAccess();
  }


  getAccess(){
      this.service.allAccess().subscribe(data=>{
        this.access = data; 
      }, error=>{
        console.log("erreur  : "+error);
      })
  }
  suppAcces(id_client,id_article) {
    if(confirm("Voulez-vous vraiment supprimer cet accès !?")) {
    this.service.deleteAccess(id_client,id_article).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Suppression effectuée avec succées', 'Success', {timeOut: 3000 });
        this.access =[];
        this.getAccess();
      }else{
        this.toastr.error('Erreu de Suppression', 'Error', {timeOut: 3000 });
      }
      
    }, error=>{
      console.log("erreur  : "+error);
    })
  }
}
}

