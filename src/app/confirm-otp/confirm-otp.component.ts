import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';

@Component({
  selector: 'app-confirm-otp',
  templateUrl: './confirm-otp.component.html',
  styleUrls: ['./confirm-otp.component.css']
})
export class ConfirmOtpComponent {
  message : string = ''
  MESSAGE : string = 'Please Enter OTP'
  otpLength : number = 4;
  digits : Array<number> = new Array<number>(this.otpLength);
  otpValidationTime : number = 30;
  OtpTimeParam : number = 0;
  otpTimeConfig : timeParameterForOtp;
  @ViewChildren('Otps') digit = {} as QueryList<ElementRef<HTMLInputElement>>;
  _onTouched!: () => void;
  _onChange!: (value: string | null) => void;
  display : any;
  constructor()
  {
    this.otpTimeConfig = timeParameterForOtp.Seconds;
    this.setTimerForOtp(this.otpValidationTime,this.otpTimeConfig );
    this.message = timeParameterForOtp[this.otpTimeConfig];
  }

  setTimerForOtp(OptValidateForTime : number, timeParam : timeParameterForOtp)
  {
    let textSec: any = "0";
    const prefix = OptValidateForTime < 10 ? "0" : "";
    if (timeParam!=timeParameterForOtp.days)
    {
    var counterTimeForOtp = 0;
    const milliseconds = (h : number, m : number, s : number) : number => ((h*60*60+m*60+s)*1000);

    switch(timeParam)
    {
      case timeParameterForOtp.minute:
        counterTimeForOtp =  milliseconds(0,OptValidateForTime,0);
      break
      case timeParameterForOtp.Seconds:
        counterTimeForOtp = milliseconds(0,0,OptValidateForTime);
      break
    }

    setInterval(()=>
    {
      if(OptValidateForTime!=0)
       OptValidateForTime--;

      this.display = `${prefix}${Math.floor(OptValidateForTime)}:${textSec}`;
    },counterTimeForOtp);
  }
  }

  onInput(index: number, $event: Event) {
    const ev = $event as KeyboardEvent;
    const digitInput = this.digit.get(index)?.nativeElement;
    const keyCode = ev.key;

    // skip paste because it's handled in another method
    if (ev.metaKey && keyCode === 'v') {
      return;
    }

    if (['Backspace', 'Tab'].indexOf(keyCode) >= 0) {
      // backspace should delete the current value
      if (keyCode === 'Backspace' && !digitInput?.value) {
        const el = this.digit.get(index - 1)?.nativeElement;
        if (el) {
          el.value = '';
        }
        this.emitChange();
        el?.focus();
      }

      return;
    }

    $event.preventDefault();

    if (Number.isNaN(Number(keyCode))) {
      return;
    }
   
    if(digitInput)
    digitInput.value = keyCode;
    this.emitChange();
    this.digit.get(index+1)?.nativeElement.focus();
  }

  private emitChange() {
    const value: string = this.digit
      .map((i) => i.nativeElement.value)
      .join('');
    if (value.length === 0) {
      this._onChange(null);
    } else if (value.length === this.otpLength) {
      this._onChange(value);
    }
  }
}

export enum timeParameterForOtp
{
minute,
Seconds,
days
}
