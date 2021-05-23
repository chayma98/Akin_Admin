import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'; 
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ApiAdminService } from '../services/api-admin.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logFor: FormGroup ;
  constructor(private fb: FormBuilder, private service:ApiAdminService, private toastr : ToastrService, private router:Router) { 

    let formControls = { 
      login : new FormControl('',  Validators.required),
      password : new FormControl('',  Validators.required)
    }
    this.logFor = this.fb.group(formControls); 
  }
  
  get login() { return this.logFor.get('login')}
  get password() { return this.logFor.get('password')}

  ngOnInit(): void {
    if(this.service.isLoggin()){
      this.router.navigate(['home']);
    }
  }
  verifUSer(){
    let data1 = this.logFor.value; 
    console.log("data 111111  : "+ data1);
    this.service.verifAdmin(data1.login, data1.password).subscribe(data=>{
      let ad : any    = data; 
      console.log("ressss AAAA: ");
      if(data["role"]=="ERROR"){
        console.log("erre    ressss : ");
        this.toastr.error('Verifier votre Login et mot de passe', 'Error', {timeOut: 3000 });
        return ;
      }else{
        console.log("ressss : "+ad.role);
        localStorage.setItem("IDA",ad['ID']) ;
        localStorage.setItem("ROLE",ad['role']) ;
        localStorage.setItem("myToken", "qokmqsmqskdlmldklqsmdqdmllqskdm");
        this.router.navigate(['home']);
      } 
  }, error=>{
    console.log("erreur");
  })
  }

}
