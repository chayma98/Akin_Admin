import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiMessageService {
  urlCnx ="http://localhost:8000/message";
  constructor(private http: HttpClient) { }
  allMessage(){
    return this.http.get(this.urlCnx+"/all" );
  }
  deleteMessage(id){
    return this.http.delete(this.urlCnx+"/delete/"+id );
  }
  detailMessage(id){
    return this.http.get(this.urlCnx+"/detail/"+id );
  }
  repMessage(msg){
    return this.http.post(this.urlCnx+"/add", msg );
  }
}
