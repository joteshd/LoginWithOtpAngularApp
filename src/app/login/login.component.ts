import { compileDirectiveFromMetadata } from '@angular/compiler';
import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { LoginwithotpService } from '../Services/loginwithotp.service';
import { ValidateUserDirective } from '../validate-user.directive';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
 public UserEmail :string = '';
 public errorMessage :string = '';
  canGenerateOtp : boolean = true;
  isValidUser : boolean = false;
  
constructor(private router : Router,private loginService : LoginwithotpService){
  
}

loginWithOtp()
{
  if(this.isValidUser)
  {
 this.loginService.validateUserEmail(this.UserEmail).
 subscribe({next : (response)=>
  {
  console.log(response);
  if(response && response.sucess)
  {
    this.router.navigate(['/confirmOtp'])
  }
 }});
  }
}
}


