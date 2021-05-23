import { Component, OnInit } from '@angular/core';
import { ApiArticleService } from 'src/app/services/api-article.service';
import { ToastrService } from 'ngx-toastr'; 
@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.css']
})
export class ListArticleComponent implements OnInit { 
  articles:any =[];
  term: string;
  constructor( private service:ApiArticleService,  private toastr: ToastrService) { }

  ngOnInit(): void { 
   
    this.getArticles();
  }


  getArticles(){
    this.service.allArticle().subscribe(data=>{
      this.articles = data; 
    }, error=>{
      console.log("erreur  : "+error);
    })
    
  }
  suppArticle(id){
    if(confirm("Voulez-vous vraiment supprimer cet article !?")) {
      this.service.deleteArticle(id).subscribe(data=>{
        if(data["resultat"]=="SUCCESS"){
          this.toastr.success('Suppression effectuée avec succées', 'Success', {timeOut: 3000 });
          this.articles =[];
          this.getArticles();
        }else{
          this.toastr.error('Erreur de Suppression', 'Error', {timeOut: 3000 });
        }
        
      }, error=>{
        console.log("erreur  : "+error);
      })
    }
  }

}

