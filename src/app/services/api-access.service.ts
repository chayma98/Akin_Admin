import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class ApiAccessService {
  urlCnx ="http://localhost:8000/access";
  constructor(private http: HttpClient) { }
 
  addAcceess(access){
    return this.http.post(this.urlCnx+"/add",access );
  }

  verifAcceess(access){
    return this.http.post(this.urlCnx+"/verif",access );
  }

  allAccess(){
    return this.http.get(this.urlCnx+"/all" );
  }

  deleteAccess(idc, ida){
    let body = {client:idc, article: ida};
    return this.http.post(this.urlCnx+"/delete", body);
  }
 

  infoAccess(id){
    return this.http.get(this.urlCnx+"/info/"+id );
  }
}
