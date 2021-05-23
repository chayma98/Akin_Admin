import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  hideAdmin: boolean = false ; 
  constructor(private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("ROLE")=="ADMIN"){
      console.log("adminnnnnn");  
      this.hideAdmin = true  ; 
    }else{ 
      console.log("cheeefff"); 
      this.hideAdmin = false  ; 
    }
  }

  
  logout(){
    localStorage.clear();
    this.router.navigate(['/']);
  }

}
 