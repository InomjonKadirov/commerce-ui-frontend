import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {AddressDto} from "../model/address.dto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;


@Injectable({
  providedIn: 'root'
})
export class AddressService {

  private addressBaseUrl = apiEndpoint + 'api/address';

  constructor(private  http: HttpClient) { }


  addAddress(address: AddressDto): Observable<AddressDto> {
    return this.http.post<AddressDto>(this.addressBaseUrl + '/add', address, httpOptions);
  }

  getAddressList(username: string): Observable<AddressDto[]> {
    return this.http.post<AddressDto[]>(this.addressBaseUrl + "/list",username, httpOptions);
  }

  getMainAddress(username: string): Observable<AddressDto> {
    return this.http.get<AddressDto>(this.addressBaseUrl + "/main", httpOptions);
  }
}
