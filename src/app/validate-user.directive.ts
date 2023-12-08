import { AfterViewInit, Directive, ElementRef, Host, Input, Optional, ViewChild, ViewContainerRef } from '@angular/core';
import { AbstractControl, EmailValidator, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { LoginwithotpService } from './Services/loginwithotp.service';
import { LoginComponent } from './login/login.component';
import { elementAt } from 'rxjs';

@Directive({
  selector: '[appValidateUser]',
  providers:[{provide: NG_VALIDATORS, useExisting:ValidateUserDirective, multi:true}]
})
export class ValidateUserDirective implements Validator {
private _parent : LoginComponent;
invalidUser : boolean =  false;

  constructor(@Optional() @Host() parent:LoginComponent) { 
    this._parent = parent;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    
    return  this.forbiddenNameValidator(control );
  }
  forbiddenNameValidator(emailCpntrol : AbstractControl)   {
    const emailRegex = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@(gmail||outlook)+(?:\.[com]+)*$/;
    const email = emailCpntrol.value;
    const valid = emailRegex.test(email);
    let isValidUser = false;
    
    if(!email) return null;
    if(email.length === 0) return null;
    if(!valid)
    {
      console.log("Marking Email as dirty")
      emailCpntrol.markAsTouched();
      emailCpntrol.markAsDirty();
     this._parent.canGenerateOtp = true;
     this._parent.errorMessage =  'Entered email address is not in correct format';
  }
  else  
  {
    emailCpntrol.markAsTouched();
    emailCpntrol.markAsDirty();
    this._parent.errorMessage =  '';
    this._parent.canGenerateOtp = false;
    this._parent.isValidUser = true;
  }
    return null
  }
}
