import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiArticleService {

  urlCnx ="http://localhost:8000/article";
  constructor(private http: HttpClient) { }

  addArticle(article){
  return  this.http.post(this.urlCnx+"/add",article );
  }

  allArticle(){
    return this.http.get(this.urlCnx+"/all" );
  }

  deleteArticle(id){
    return this.http.delete(this.urlCnx+"/delete/"+id );
  }

  editArticle(article){
    return this.http.put(this.urlCnx+"/edit",article );
  }

  detailArticle(id){
    return this.http.get<any>(this.urlCnx+"/show/"+id );
  }
}
