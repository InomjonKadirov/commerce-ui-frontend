import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable} from "rxjs";
import {Menu} from "../header/widgets/navbar/navbar-items";
import {shareReplay} from "rxjs/operators";
import {BannerDto} from "../model/banner.dto";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private bannerBaseUrl = apiEndpoint + 'api/shop/banner';
  constructor(private  http: HttpClient) { }


  getLargeBannerList(): Observable<BannerDto[]> {
    //
    // if(!this.menus$) {
    //   this.menus$ = this.http.get<Menu[]>(this.menuBaseUrl + '/main', httpOptions)
    //       .pipe(shareReplay(1));
    // }
    //
    //
    // return this.menus$;

    return this.http.get<BannerDto[]>(this.bannerBaseUrl + '/list', httpOptions);

  }
}
