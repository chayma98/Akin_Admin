import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiCommandeService {
  urlCnx ="http://localhost:8000/commande";
  constructor(private http: HttpClient) { }

  allCommande(){
   return this.http.get(this.urlCnx+"/all" );
  }
 
  editCommande(id,action){
    let body = {id:id, etat: action};
    return this.http.put(this.urlCnx+"/edit",body );
  }

  infoCommande(id){
    return this.http.get(this.urlCnx+"/show/"+id );
  }
}
