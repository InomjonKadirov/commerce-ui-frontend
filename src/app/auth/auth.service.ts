import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {JwtHelperService} from "@auth0/angular-jwt";
import {BehaviorSubject, Observable} from "rxjs";
import {JwtResponse} from "./JwtResponse";
import {AuthLoginInfo} from "./AuthLoginInfo";
import {SignUpInfo} from "./SignUpInfo";
import {map} from "rxjs/operators";

const helper = new JwtHelperService();


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<JwtResponse>;
  public currentUser: Observable<JwtResponse>;



  private loginUrl =  apiEndpoint + 'api/token/generate-token';
  private signupUrl = apiEndpoint + 'api/auth/signup';

  constructor(private http: HttpClient) {

    this.currentUserSubject = new BehaviorSubject<JwtResponse>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): JwtResponse {
    return this.currentUserSubject.value;
  }



  attemptAuth(credentials: AuthLoginInfo): Observable<JwtResponse> {
    return this.http.post<JwtResponse>(this.loginUrl, credentials, httpOptions)
        .pipe(map( data => {
              console.log(JSON.stringify(data));
              if (data && data.accessToken) {
                localStorage.setItem('currentUser', JSON.stringify(data));
                this.currentUserSubject.next(data);
              }
              return data;
            },
            err => {
              return alert('Unable re authenticate');
            }));
  }


  signUp(info: SignUpInfo): Observable<string> {
    return this.http.post<string>(this.signupUrl, info, httpOptions);
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);

  }

  public get loggedIn(): boolean{
    return localStorage.getItem('currentUser') !==  null;
  }

  // is Authorized by Role
  isAuthorizedByRole(allowedRoles: string[], userRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }



    // get token from local storage or state management
    const token = localStorage.getItem('currentUser');


    const arr = [];
    Object.keys(userRoles).map(key => {
      arr.push({[key]: userRoles[key]});
      return arr;
    });



    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(arr[0][0].authority);
  }

  getToken(): string {
    return localStorage.getItem('currentUser');
  }





  isTokenExpired(token?: string): boolean {
    if (!token) {token = this.getToken(); }
    if (!token) {return true; }

    const date = helper.getTokenExpirationDate(token);
    console.log(date);
    if (date === undefined) {return false; }
    return !(date.valueOf() > new Date().valueOf());
  }
}