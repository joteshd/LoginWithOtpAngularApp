import { Injectable } from '@angular/core';
import * as DOMPurify from 'dompurify';
import * as sqlString from "sqlstring";

@Injectable({
  providedIn: 'root'
})
export class SecurityServiceService {

  constructor() { }

  Senitizedxss(json: any) : any {
    return DOMPurify.sanitize(json);
  }

  SenitizedsqlInjection(json: any) : any {
    return sqlString.escape(json);
  }
}
