import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  formdata={name:"",gmail:"",password:""};
  submit=false;
  errorMessage="";
  loading=false;
  constructor(private auth:AuthService){

  }
  ngOnInit(): void{
    this.auth.canAuthenticate();
  }
  onSubmit(): void{
    console.log(this.formdata);
    this.loading=true;
    this.auth
    .register(this.formdata.name,this.formdata.gmail,this.formdata.password)
    .subscribe({
      next:data=>{
        this.auth.storeToken(data.idToken);
        console.log("registered  idtoken is "+data.idToken);
        this.auth.canAuthenticate();
      },
      error:data=>{
        if(data.error.error.message="INVALID_EMAIL"){
          this.errorMessage="Invalid Email!";

        }else if (data.error.error.message="EMAIL_EXITS"){
          this.errorMessage="Already Email Exists!";
        }else{
          this.errorMessage="Unknown Error occured";
        }
      }
    }).add(()=>{
      this.loading=false;
      console.log("Register complated!");

    })
  }
}
