import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'; 
import { ToastrService } from 'ngx-toastr';
import { ApiAdminService } from '../services/api-admin.service';
import { Admin } from 'src/app/models/admin';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  editAD: FormGroup;
  id:number; 
  constructor(private fb: FormBuilder,   private service : ApiAdminService, 
    private toastr : ToastrService, private router:Router) { 
    this.id = parseInt(localStorage.getItem("IDA")); 
    console.log("iddddddd session : "+this.id);
   
    let formControls = {
      cin : new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      nom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      prenom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      tel : new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      email : new FormControl('',  [Validators.required, Validators.email]),
      login : new FormControl('',  Validators.required),
      password : new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
       }
    this.editAD = this.fb.group(formControls); 
  }
  
  get cin() { return this.editAD.get('cin')}
  get nom() { return this.editAD.get('nom')}
  get prenom() { return this.editAD.get('prenom')}
  get tel() { return this.editAD.get('tel')}
  get email() { return this.editAD.get('email')}
  get login() { return this.editAD.get('login')}
  get password() { return this.editAD.get('password')}
  


  ngOnInit(): void {
    this.service.detailAdmin(this.id).subscribe(data=>{
        let AD   = data[0]; 
        console.log("rlllss : "+AD['cin_admin']);
        this.editAD.patchValue({
          cin: AD.cin_admin, 
          nom: AD.nom_admin, 
          prenom: AD.prenom_admin, 
          tel: AD.tel_admin,  
          email: AD.email_admin,
          login: AD.login_admin,
          password: AD.password_admin   
        })
    }, error=>{
      console.log("erreur");
    })
  }

  saveAdmin(){
    let data = this.editAD.value ;
    console.log("contenue : "+data);
    let admin  = new Admin(this.id, data.cin, data.nom, data.prenom, data.tel, data.email, data.login, data.password);
    this.service.editAdmin(admin).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Modification effectuée avec succées', 'Success', {timeOut: 3000 });
        this.router.navigate(['/home']);
      }else{
        this.toastr.error('Erreur de Modification', 'Error', {timeOut: 3000 });
      }
    }, error=>{
      console.log("Erreur: "+error);
    })
  }

}
