import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AjoutArticleComponent } from './ajout-article/ajout-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { ListArticleComponent } from './list-article/list-article.component';


const routes: Routes = [
  {path:'add', component: AjoutArticleComponent},
  {path:'edit/:id', component: EditArticleComponent},
  {path:'all', component: ListArticleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PremiumRoutingModule { }
