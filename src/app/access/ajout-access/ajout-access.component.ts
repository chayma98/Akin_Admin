import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiClientService } from 'src/app/services/api-client.service';
import { ApiArticleService } from 'src/app/services/api-premium.service';
import { Access } from 'src/app/models/access';
import { ApiAccessService } from 'src/app/services/api-access.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ajout-access',
  templateUrl: './ajout-access.component.html',
  styleUrls: ['./ajout-access.component.css']
})
export class AjoutAccessComponent implements OnInit {

  addAcc: FormGroup; 
  clients:any =[];
  articles:any =[];
  constructor(private fb: FormBuilder, 
    private apiCLT : ApiClientService,
    private apiART: ApiArticleService,
    private service :ApiAccessService,
    private toastr : ToastrService, private router:Router) { 

    let formControls = {
      article : new FormControl(Validators.required), 
      client : new FormControl(Validators.required), 
    }
    this.addAcc = this.fb.group(formControls); 
  }

  get article() { return this.addAcc.get('article')}
  get client() { return this.addAcc.get('client')} 

  
  ngOnInit(): void {
    this.getAllClients();
    this.getAllArticles();
  }


  saveAccess(){
    let data1 = this.addAcc.value ;
    console.log("contenue : "+data1);
    let acces  = new Access(data1.client, data1.article);
    this.service.verifAcceess(acces).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.saveAcces(acces);
      }else{
        this.toastr.error('Access Existe déja', 'Error', {timeOut: 3000 });
      }
    }, error=>{
      console.log("Erreur")
    })



    
  }
  
  saveAcces(acces){
    //let acces  = new Access(data.client, data.article);
    this.service.addAcceess(acces).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Ajout effectuée avec succées', 'Success', {timeOut: 3000 });
        this.router.navigate(['home/access/all']);
      }else{
        this.toastr.error('Erreur d\'ajout', 'Error', {timeOut: 3000 });
      }
    }, error=>{
      console.log("Erreur: "+error);
    })
  }

  getAllClients(){
    this.apiCLT.allClient().subscribe(data=>{
      this.clients = data; 
    }, error=>{
      console.log("erreur  : "+error);
    })
  }
  getAllArticles(){
    this.apiART.allArticle().subscribe(data=>{
      this.articles = data; 
    }, error=>{
      console.log("erreur  : "+error);
    }) 
  }

}
