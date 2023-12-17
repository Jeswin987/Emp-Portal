import { Component } from '@angular/core';
import { AdminApiService } from '../services/admin-api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""
  constructor(private api:AdminApiService, private router:Router){}

  login(){
    if(this.email && this.password){
      this.api.authenticate().subscribe({
        next:(res:any)=>{
          console.log(res);
          const {email,password} = res
          if(email === this.email && password === this.password){
            localStorage.setItem("admin_name",res.name)
            localStorage.setItem("admin_pswd",res.password)
            alert('Login successfull')
            this.router.navigateByUrl('dashboard')
          }else{
            alert('Inavlid email or password')
          }
        },
        error:(res:any)=>{
          alert(res.message)
        }
      })
    }else{
      alert("please fill form")
    }
  }
}
