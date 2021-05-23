import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Chef } from 'src/app/models/chef';
import { ApiChefService } from 'src/app/services/api-chef.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ajout-chef',
  templateUrl: './ajout-chef.component.html',
  styleUrls: ['./ajout-chef.component.css']
})
export class AjoutChefComponent implements OnInit {
  addCH: FormGroup
  constructor(private fb: FormBuilder, private service:ApiChefService, private toastr : ToastrService, private router:Router) { 

    let formControls = {
      cin : new FormControl('', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(8), Validators.minLength(8)]),
      nom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      prenom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      tel : new FormControl('', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(8), Validators.minLength(8)]),
      email : new FormControl('',  [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
      login : new FormControl('',  Validators.required),
      password : new FormControl('',  [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
       }
    this.addCH = this.fb.group(formControls); 
  }
  get cin() { return this.addCH.get('cin')}
  get nom() { return this.addCH.get('nom')}
  get prenom() { return this.addCH.get('prenom')}
  get tel() { return this.addCH.get('tel')}
  get email() { return this.addCH.get('email')}
  get login() { return this.addCH.get('login')}
  get password() { return this.addCH.get('password')}
  ngOnInit(): void {
  }

  saveChef(){
    let data = this.addCH.value ;
    console.log("contenue : "+data);
    let chef  = new Chef(null, data.cin, data.nom, data.prenom, data.tel, data.email, data.login, data.password);
    this.service.addChef(chef).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Ajout chef effectuée avec succées', 'Success', {timeOut: 3000 });
        //this.router.navigate(['home/chef/all']);
        this.addCH.reset();
      }else{
        this.toastr.error('Chef déja existe', 'Error', {timeOut: 3000 });
        this.addCH.reset();
      }
    }, error=>{
      console.log("Erreur: "+error);
    })
  }

}
