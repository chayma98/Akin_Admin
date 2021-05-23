import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { ArticleRoutingModule } from './article-routing.module';
import { AjoutArticleComponent } from './ajout-article/ajout-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FileUploadModule } from 'ng2-file-upload'; 
import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  declarations: [AjoutArticleComponent, EditArticleComponent, ListArticleComponent   ],
  imports: [
    CommonModule,
    ArticleRoutingModule, 
    FormsModule, 
    ReactiveFormsModule, 
    FileUploadModule, 
    Ng2SearchPipeModule
  ]
})
export class ArticleModule { }
