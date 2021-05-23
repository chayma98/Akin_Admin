import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Article } from 'C:/xampp/htdocs/PFEaalVS/PFE/SARTEXX/SARTEXX/src/app/models/premium';
import { ApiArticleService } from 'C:/xampp/htdocs/PFEaalVS/PFE/SARTEXX/SARTEXX/src/app/services/api-premium.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiCategorieService } from 'C:/xampp/htdocs/PFEaalVS/PFE/SARTEXX/SARTEXX/src/app/services/api-categorie.service'; 
import { FileUploader } from 'ng2-file-upload';
@Component({
  selector: 'app-ajout-article',
  templateUrl: './ajout-article.component.html',
  styleUrls: ['./ajout-article.component.css']
})
export class AjoutArticleComponent implements OnInit { 
  public uploader:FileUploader = new FileUploader({url:'http://localhost:8000/upload'});
  fileName:string ; 
  addArt: FormGroup;  
  categs:any =[];
  constructor(private fb: FormBuilder, private service:ApiArticleService, private toastr : ToastrService, 
    private router:Router, private apiC :ApiCategorieService) { 

    let formControls = {
      nom : new FormControl('',Validators.required),
      descrip : new FormControl('', Validators.required), 
      categ : new FormControl('', Validators.required), 
      single : new FormControl('', Validators.required), 
      prix : new FormControl('', [Validators.required, Validators.pattern(/^-?[1-9]\d*(\.\d*)?$/), Validators.maxLength(7), Validators.minLength(2)])
    } //       /^[.\d]+$/
    this.addArt = this.fb.group(formControls); 
  }
 
  get nom() { return this.addArt.get('nom')}
  get descrip() { return this.addArt.get('descrip')} 
  get prix() { return this.addArt.get('prix')}
  get categ() { return this.addArt.get('categ')} 
  get single() { return this.addArt.get('single')} 

  
  ngOnInit(): void {
    this.apiC.allCateg().subscribe(data=>{
      this.categs = data; 
    }, error=>{
      console.log("erreur  : "+error);
    })
  }

  onFileChanged(event) { //pour récupérer
    this.fileName = event.target.files[0].name ;
    console.log( "fileeeeeeeeeeeeee : "+event.target.files[0].name);
  }

  saveArticle(){
    let data = this.addArt.value ;
    if(data.prix==0){
      this.toastr.error('Prix Invalide', 'Error', {timeOut: 3000 });
      return ; 
    }
    console.log("contenue : "+data);
    console.log("file naleeeeeeeee : "+this.fileName);
    let article  = new Article(null, data.nom, data.descrip, this.fileName, data.prix, data.categ);
    this.uploader.uploadAll();
    this.service.addArticle(article).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Ajout article effectuée avec succées', 'Success', {timeOut: 3000 });
       // this.router.navigate(['home/premium/all']);
       this.addArt.reset();
      }else{   
        this.toastr.error('Article déja existe', 'Error', {timeOut: 3000 });
        this.addArt.reset();

      }
    }, error=>{
      console.log("Erreur: "+error);
    })
  }

  
    
     
  }
