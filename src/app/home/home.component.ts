import { Component, OnInit } from '@angular/core'; 
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hideChef: boolean = false ; 
  hideAdmin: boolean = false ; 
  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("ROLE")=="ADMIN"){
      console.log("adminnnnnn");
      this.hideChef = false; 
      this.hideAdmin = true  ; 
    }else{ 
      console.log("cheeefff");
      this.hideChef = true; 
      this.hideAdmin = false  ; 
    }
  }

}
