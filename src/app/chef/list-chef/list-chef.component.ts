import { Component, OnInit } from '@angular/core';
import { ApiChefService } from 'src/app/services/api-chef.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-list-chef',
  templateUrl: './list-chef.component.html',
  styleUrls: ['./list-chef.component.css']
})
export class ListChefComponent implements OnInit {
  chefs:any =[];  
  term: string;
  constructor(private service:ApiChefService, private toastr: ToastrService) { }

  ngOnInit(): void {   
    this.getChefs();
  }


  getChefs(){
      this.service.allChef().subscribe(data=>{
        this.chefs = data; 
        console.log("namee : "+this.chefs[0]['cin_chef']);
      }, error=>{
        console.log("erreur  : "+error);
      })
  }


  
  suppChef(id) {
    if(confirm("Voulez-vous vraiment supprimer ce chef !?")) {
      this.service.deleteChef(id).subscribe(data=>{
        if(data["resultat"]=="SUCCESS"){
          this.toastr.success('Suppression effectuée avec succées', 'Success', {timeOut: 3000 });
          this.chefs =[];
          this.getChefs();
        }else{
          this.toastr.error('Erreur de Suppression', 'Error', {timeOut: 3000 });
        }
        
      }, error=>{
        console.log("erreur  : "+error);
      })
    }
  }

}
