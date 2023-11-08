import { Directive, Input } from '@angular/core';
import { AbstractControl, EmailValidator, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { LoginwithotpService } from './Services/loginwithotp.service';

@Directive({
  selector: '[appValidateUser]',
  providers:[{provide: NG_VALIDATORS, useExisting:ValidateUserDirective, multi:true}]
})
export class ValidateUserDirective implements Validator {
// @Input('appValidateUser') UserEmail = '';
invalidUser : boolean =  false;

  constructor(private loginWithOtp : LoginwithotpService) { 
  }

  validate(control: AbstractControl): ValidationErrors | null {
    
    return  this.forbiddenNameValidator(control.value);
  }
  forbiddenNameValidator(email : string) : ValidationErrors | null
  {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    const valid = emailRegex.test(email);
    if(!valid)
    return {invalidUser : {
      message : 'Entered email address is not in correct format'
    }}
    if(!email) return null;
    if(email.length === 0) return null;
  if(this.loginWithOtp.validateUserEmail(email)) return null
  else return {
    invalidUser : {
      message : 'Entered email address is not regsitered with us. please try with registered email address'
    }
  };    
    return null;
  }
}
