import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiCommandeService } from 'src/app/services/api-commande.service';

@Component({
  selector: 'app-ligne-cmd',
  templateUrl: './ligne-cmd.component.html',
  styleUrls: ['./ligne-cmd.component.css']
})
export class LigneCmdComponent implements OnInit {
  ligneCMD:any = [];
  idc : string; 
  constructor(private activateRoute:  ActivatedRoute, private service: ApiCommandeService) {
      this.idc = this.activateRoute.snapshot.paramMap.get("id");
      console.log("cmdd : "+this.idc);
   }

  ngOnInit(): void {
    this.service.infoCommande(this.idc).subscribe(data=>{
      this.ligneCMD = data  ;
    }, error =>{
      console.log("Erreur")
    })
  }

}
