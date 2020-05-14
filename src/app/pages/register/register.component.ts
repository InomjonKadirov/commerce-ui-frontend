import { Component, OnInit } from '@angular/core';

// import * as firebase from 'firebase';
import {WindowService} from "../../shared/services/window.service";
import * as firebase from "firebase";

// export class PhoneNumber {
//   country: string;
//   area: string;
//   prefix: string;
//   line: string;
//
//   // format phone numbers as E.164
//   get e164() {
//     const num = this.country + this.area + this.prefix + this.line
//     return `+${num}`
//   }
//
// }


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  windowRef: any;

  phoneNumber = '+998';

  verificationCode: string;

  user: any;

  // User details
  firstName: string;
  lastName: string;
  password: string;
  passwordConfirm: string;


  passwordMustState = false;

  smsCodeVerificationState = false;





  constructor(private win: WindowService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')

    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    console.log(this.phoneNumber);
    let num = this.phoneNumber;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
        .then(result => {

          this.windowRef.confirmationResult = result;
        })
        .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
        .confirm(this.verificationCode)
        .then( result => {

          this.user = result.user;
          this.smsCodeVerificationState = true;

        })
        .catch( error => console.log(error, "Incorrect code entered?"));
  }


  checkPasswordInoutMatch() {

    if (this.password === this.passwordConfirm) {
      this.passwordMustState = false;
    } else {
      this.passwordMustState = true;
    }
  }

}