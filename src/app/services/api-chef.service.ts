import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiChefService {

  urlCnx ="http://localhost:8000/chef";
  constructor(private http: HttpClient) { }

  addChef(chef){
    return  this.http.post(this.urlCnx+"/add",chef);
  }

  allChef(){
    return this.http.get(this.urlCnx+"/all" );
  }

  deleteChef(id){
    return this.http.delete(this.urlCnx+"/delete/"+id );
  }

  editChef(chef){
    return this.http.put(this.urlCnx+"/edit",chef );
  }

  detailChef(id){
    return this.http.get<any>(this.urlCnx+"/show/"+id );
  }
}
