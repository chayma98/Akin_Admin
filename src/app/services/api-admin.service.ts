import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiAdminService {
  urlCnx ="http://localhost:8000/admin";
  constructor(private http: HttpClient) { }

  verifAdmin(log, pass){
    let body = {login: log, password: pass};
    return this.http.post(this.urlCnx+"/cnx",body);
  }
  allAdmin(){
    return this.http.get(this.urlCnx+"/all" );
  }

  detailAdmin(id){
    return this.http.get<any>(this.urlCnx+"/show/"+id );
  }

  editAdmin(admin){
    return this.http.put(this.urlCnx+"/edit",admin );
  }

  isLoggin(){
    let token = localStorage.getItem("myToken");
    if(token){
      return true ; 
    }else{
      return false ; 
    }
  }
 
}
