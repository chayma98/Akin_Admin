import { Component, OnInit } from '@angular/core'; 
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiChefService } from 'src/app/services/api-chef.service';
import { Chef } from 'src/app/models/chef';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-chef',
  templateUrl: './edit-chef.component.html',
  styleUrls: ['./edit-chef.component.css']
})
export class EditChefComponent implements OnInit {
  editCH: FormGroup;
  id:number; 
  constructor(private fb: FormBuilder, private activateRoute:ActivatedRoute, private service : ApiChefService, 
    private toastr : ToastrService, private router:Router) { 
    this.id = parseInt(this.activateRoute.snapshot.paramMap.get('id'));
    console.log("iddddddd : "+this.id);
    let formControls = {
      cin : new FormControl('', [Validators.required,  Validators.pattern("[0-9]+"), Validators.maxLength(8), Validators.minLength(8)]),
      nom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      prenom : new FormControl('', [Validators.required, Validators.pattern("[a-z,A-Z]+")]),
      tel : new FormControl('', [Validators.required, Validators.pattern("[0-9]+"), Validators.maxLength(8), Validators.minLength(8)]),
      email : new FormControl('',  [Validators.required, Validators.pattern("[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}")]),
      login : new FormControl('',  Validators.required),
      password : new FormControl('',  [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
       }
    this.editCH = this.fb.group(formControls); 
  }
  get cin() { return this.editCH.get('cin')}
  get nom() { return this.editCH.get('nom')}
  get prenom() { return this.editCH.get('prenom')}
  get tel() { return this.editCH.get('tel')}
  get email() { return this.editCH.get('email')}
  get login() { return this.editCH.get('login')}
  get password() { return this.editCH.get('password')}



  ngOnInit(): void {
    this.service.detailChef(this.id).subscribe(data=>{
        let ch   = data[0]; 
        console.log("ressss : "+ch['cin_chef']);
        this.editCH.patchValue({
          cin: ch.cin_chef, 
          nom: ch.nom_chef, 
          prenom: ch.prenom_chef, 
          tel: ch.tel_chef,  
          email: ch.email_chef,
          login: ch.login_chef,
          password: ch.password_chef   
        })
    }, error=>{
      console.log("erreur");
    })
  }

  saveChef(){
    let data = this.editCH.value ;
    console.log("contenue : "+data);
    let chef  = new Chef(this.id, data.cin, data.nom, data.prenom, data.tel, data.email, data.login, data.password);
    this.service.editChef(chef).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('Modification effectuée avec succées', 'Success', {timeOut: 3000 });
        this.router.navigate(['home/chef/all']);
      }else{
        this.toastr.error('Erreur de Modification', 'Error', {timeOut: 3000 });
        this.editCH.reset();
      }
    }, error=>{
      console.log("Erreur: "+error);
    })
  }

}
