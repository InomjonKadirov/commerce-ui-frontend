import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {CustomerAddDto} from "../model/customer.add.dto";
import {Observable} from "rxjs";
import {CustomerDto} from "../model/customer.dto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private customerBaseUrl = apiEndpoint + 'api/customer';

  constructor(private  http: HttpClient) { }

  addCustomer(customer: CustomerAddDto): Observable<CustomerDto> {
    return this.http.post<CustomerDto>(this.customerBaseUrl + '/signup', customer, httpOptions);
  }

  getCurrentLoggedInCustomerInfo(): Observable<CustomerDto> {
    return this.http.get<CustomerDto>(this.customerBaseUrl + "/current", httpOptions);
  }

}
