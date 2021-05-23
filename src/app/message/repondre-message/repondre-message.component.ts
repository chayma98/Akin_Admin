import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Message } from 'src/app/models/message';
import { ApiMessageService } from 'src/app/services/api-message.service';
@Component({
  selector: 'app-repondre-message',
  templateUrl: './repondre-message.component.html',
  styleUrls: ['./repondre-message.component.css']
})
export class RepondreMessageComponent implements OnInit {

  repMesg: FormGroup;
  id:number; 
  constructor(private fb: FormBuilder, private activateRoute:ActivatedRoute, private service : ApiMessageService, 
    private toastr : ToastrService, private router:Router) { 
      this.id = parseInt(this.activateRoute.snapshot.paramMap.get('id'));

    let formControls = {
      sujet : new FormControl ('', Validators.required),
      rep : new FormControl ('', Validators.required )
    }
      this.repMesg = this.fb.group(formControls); 
  }

  get rep() { return this.repMesg.get('rep')}
  get sujet() { return this.repMesg.get('sujet')}


  ngOnInit(): void {
    this.service.repMessage(this.id).subscribe(data=>{
      let msg  = data[0]; 
      this.repMesg.patchValue({
        sujet:msg.sujet,
        rep: msg.destination, 
      })
  }, error=>{
    console.log("erreur");
  })
  }

  saveMessage(){
    let data = this.repMesg.value ;
    console.log("contenue : "+data);
    let message  = new Message (null, data.sujet,null, data.rep, this.id);
    this.service.repMessage(message).subscribe(data=>{
      if(data["resultat"]=="SUCCESS"){
        this.toastr.success('réponse effectuée avec succées', 'Success', {timeOut: 3000 });
        this.router.navigate(['home/message/all']);
      }else{
        this.toastr.error('Erreur de réponse', 'Error', {timeOut: 3000 });
      }
    }, error=>{
      console.log("Erreur: "+error);
    })

  }
}
