import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ConfirmOtpComponent } from './confirm-otp/confirm-otp.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'confirmOtp',
  component:ConfirmOtpComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
