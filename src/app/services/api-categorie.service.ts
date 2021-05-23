import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCategorieService {
  urlCnx ="http://localhost:8000/categorie";
  constructor(private http: HttpClient) { }

 
  allCateg(){
    return this.http.get(this.urlCnx+"/all" );
  }
}
