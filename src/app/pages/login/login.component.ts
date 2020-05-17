import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthLoginInfo} from "../../auth/AuthLoginInfo";
import {AuthService} from "../../auth/auth.service";
import {Router} from "@angular/router";
import {first} from "rxjs/operators";
import { Location } from '@angular/common';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  loading = false;
  submitted = false;
  isLoggedIn = false;

  error = '';
  roles: string[] = [];
  authorities: string[] = [];




  private loginInfo: AuthLoginInfo;

  constructor(private formBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private location: Location) {


    // redirect to home if already logged in
    // TODO: loggedIn ni get authService.currentUserValue ga almashtirish menimcha
    if (this.authService.loggedIn) {
      this.router.navigate(['dashboard/default']);
    }


  }


  goBack() {
    this.location.back();
  }


  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      userName: [''],
      password: [''],
    })
  }



  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username   : ['', [Validators.required]],
      password: ['', Validators.required]
    });

    if (this.authService.currentUserValue != null) {
      if (this.authService.currentUserValue.accessToken) {
        this.isLoggedIn = true;
        this.roles = this.authService.currentUserValue.authorities;
      }
    }


  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }


  onSubmit() {


    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;


    this.loginInfo = new AuthLoginInfo(
        this.f.username.value,
        this.f.password.value);

    console.log(this.loginInfo.username);
    console.log(this.loginInfo.password);

    this.authService.attemptAuth(this.loginInfo)
        .pipe(first())
        .subscribe(
            data => {

              this.authorities = Object.values(data.authorities[0]);
              console.log(this.authorities[0]);

              // if (this.authorities[0] === 'ROLE_CUSTOMER') {
              //   this.router.navigate(['dashboard/default']);
              // }

              this.goBack();
              window.location.reload();
            },
            error => {
              this.error = error;
              this.loading = false;
            }
        );
  }

  reloadPage(): void {
    // window.location.reload();
    this.router.navigate(['pages/dashboard']);
  }

}
