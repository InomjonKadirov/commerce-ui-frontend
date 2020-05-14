import { Injectable } from '@angular/core';

const helper = new JwtHelperService();


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
}
