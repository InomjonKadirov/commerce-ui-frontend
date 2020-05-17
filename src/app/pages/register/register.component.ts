import { Component, OnInit } from '@angular/core';

// import * as firebase from 'firebase';
import {WindowService} from "../../shared/services/window.service";
import * as firebase from "firebase";
import {CustomerService} from "../../shared/services/customer.service";
import {CustomerAddDto} from "../../shared/model/customer.add.dto";
import {CustomerDto} from "../../shared/model/customer.dto";
import {AuthService} from "../../auth/auth.service";
import {AuthLoginInfo} from "../../auth/AuthLoginInfo";

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

  newCustomer: CustomerAddDto;
  customerDTO: CustomerDto;
  credentials: AuthLoginInfo;



  constructor(
      private win: WindowService,
      private customerService: CustomerService,
      private authService: AuthService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {'size': 'invisible'});

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


  addCustomer() {

    // populating newCustomer with data
    this.newCustomer = new CustomerAddDto(
        this.firstName, this.lastName, this.password, this.phoneNumber
    );



    // sending to server
    this.customerService.addCustomer(this.newCustomer)
        .subscribe(
            data => {
                          console.log(JSON.stringify(data));
                          this.customerDTO = data;

                          // authenticate the customer with new credentials
                          this.credentials = new AuthLoginInfo(data.username, this.password);
                          this.authService.attemptAuth(this.credentials)
                              .subscribe(value => {
                                      console.log("Successfully authenticated");
                              },error => {
                                      console.log("Error authenticating");
                              });

        }, error => {
                          alert(error);
        });


  }
}