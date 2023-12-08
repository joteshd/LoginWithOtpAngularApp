import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser, IUserOtpValidator } from '../ServiceModels/IUser';
import { mapToCanActivate } from '@angular/router';
import { map,throwError,catchError, Observable, onErrorResumeNextWith, mergeMap, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginwithotpService {

  private endPoint : string = 'https://localhost:7268/UserAuth/';
  constructor(private http : HttpClient) { }
 
  validateOtp(userOtp : string) : boolean
  {
    var userotpvalidation = this.http.get<IUserOtpValidator>(this.endPoint,{params : new HttpParams().set('top',userOtp)});
    return true;
  }
  validateUserEmail(email :  string) : Observable<any>{
   const url =this.endPoint + 'ValidateUser'
  //  const user = {} as IUser;
  //  user.IsLoginWithOpt = false;
   return this.http.get(url,{params : new HttpParams().set('emails', email)})
    .pipe(
      catchError(error => {
        if (error.status === 401 || error.status === 403) {
          // handle error
        }
        return throwError(error);
      })
    );
   
    // response.then((data : any)=>{
    //   console.log(data);
    //   user.IsLoginWithOpt = data;
    //  });
    //  .pipe(
    //   map((response : any) : any => 
    //   {
    //     return response;
    //   }),
    //   catchError((error: any) : any => {
    //     console.error("Not Vaid User: ", error.Message);
    //     return false;
    //     ;
    //   })
    //  );
    // console.log(user,'check');
    // console.log(user.subscribe((data : any)=>{ return data}));
    //  return user.IsLoginWithOpt;

    // return reponse;
  }
}
