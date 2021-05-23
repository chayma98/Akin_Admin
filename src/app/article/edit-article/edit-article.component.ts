import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiArticleService } from 'src/app/services/api-article.service';
import { Article } from 'src/app/models/article';
import { ToastrService } from 'ngx-toastr';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {
  public uploader:FileUploader = new FileUploader({url:'http://localhost:8000/upload'});

  editArt: FormGroup;
  id:number; 
  fileName:string ; 

  constructor(private fb: FormBuilder, private activateRoute:ActivatedRoute, private service : ApiArticleService, 
    private toastr : ToastrService, private router:Router) { 
      this.id = parseInt(this.activateRoute.snapshot.paramMap.get('id'));

    let formControls = {
      nom : new FormControl('',Validators.required),
      descrip : new FormControl('', Validators.required), 
      prix : new FormControl('', [Validators.required,  Validators.pattern(/^-?[1-9]\d*(\.\d*)?$/), Validators.maxLength(4), Validators.minLength(2)]),
      single : new FormControl('', Validators.required), 

    }
    this.editArt = this.fb.group(formControls); 
  }

  get nom() { return this.editArt.get('nom')}
  get descrip() { return this.editArt.get('descrip')} 
  get prix() { return this.editArt.get('prix')}
  get single() { return this.editArt.get('single')} 

  ngOnInit(): void {
    this.service.detailArticle(this.id).subscribe(data=>{
        let art  = data[0]; 
        this.editArt.patchValue({
          nom: art.nom_article, 
          descrip: art.description, 
          prix: art.prix,
         idcateg:art.id,
        })
    }, error=>{
      console.log("erreur");
    })
  }

  onFileChanged(event) {
    this.fileName = event.target.files[0].name ;
    console.log( "fileeeeeeeeeeeeee : "+event.target.files[0].name);
  }

  saveArticle(){
    let data = this.editArt.value ;
    if(data.prix==0){
      this.toastr.error('Prix Invalide', 'Error', {timeOut: 3000 });
      return ; 
    }
    console.log("contenue : "+data);
    let article  = new Article(this.id, data.nom, data.descrip, this.fileName, data.prix);
    this.uploader.uploadAll();
    this.service.editArticle(article).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Modification effectuée avec succées', 'Success', {timeOut: 3000 });
        this.router.navigate(['home/article/all']);
      }else{
        this.toastr.error('Erreur de Modification', 'Error', {timeOut: 3000 });
        this.editArt.reset();
      }
    }, error=>{
      console.log("Erreur: "+error);
    })

  }
}
