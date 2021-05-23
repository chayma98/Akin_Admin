import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  urlCnx ="http://localhost:8000/client";
  constructor(private http: HttpClient) { }

   

  allClient(){
    return this.http.get(this.urlCnx+"/all" );
  }

  
  editClient(id, etat){
    let body = {id: id, etat:etat};
    return this.http.put(this.urlCnx+"/edit",body );
  }
}
