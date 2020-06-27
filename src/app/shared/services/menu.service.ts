import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Observable, ReplaySubject} from "rxjs";
import {Menu} from "../header/widgets/navbar/navbar-items";
import {shareReplay} from "rxjs/operators";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

const apiEndpoint = environment.apiEndPoint;

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private menus$: Observable<Menu[]>;
  private menuBaseUrl = apiEndpoint + 'api/shop/menu';
  constructor(private  http: HttpClient) { }


  getAllMainMenu(): Observable<Menu[]> {

    if(!this.menus$) {
      this.menus$ = this.http.get<Menu[]>(this.menuBaseUrl + '/main', httpOptions)
          .pipe(shareReplay(1));
    }


    return this.menus$;
  }
}
