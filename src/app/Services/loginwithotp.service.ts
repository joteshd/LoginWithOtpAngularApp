import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserOtpValidator } from '../ServiceModels/IUser';
import { mapToCanActivate } from '@angular/router';
import { map,throwError,catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginwithotpService {

  private endPoint : string = 'http://localhost:44303';
  constructor(private http : HttpClient) { }
 
  validateOtp(userOtp : string) : boolean
  {
    var userotpvalidation = this.http.get<IUserOtpValidator>(this.endPoint,{params : new HttpParams().set('top',userOtp)});
    return true;
  }
  validateUserEmail(email :  string){

     var  user =  this.http.get<IUser>(this.endPoint,{params : new HttpParams().set('UserMail', email)})
     .pipe(
      map((response : IUser)=> {return response;}),
      catchError((error: any) => {
        console.error("Not Vaid User: ", error);
        return throwError("Not Vaid User");
      })
     );
     return user ? true:false;
  }
}
