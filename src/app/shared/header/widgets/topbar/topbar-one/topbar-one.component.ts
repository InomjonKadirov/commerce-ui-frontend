import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../classes/product';
import { WishlistService } from '../../../../services/wishlist.service';
import { ProductsService } from '../../../../../shared/services/products.service';
import { Observable, of } from 'rxjs';
import {AuthService} from "../../../../../auth/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar-one.component.html',
  styleUrls: ['./topbar-one.component.scss']
})
export class TopbarOneComponent implements OnInit {

  loggedIn:any;
  isExpired:any;

  constructor(public productsService: ProductsService,
              private authService: AuthService) { }

  ngOnInit() {

    this.loggedIn = this.authService.loggedIn;
    this.isExpired = this.authService.isTokenExpired(this.authService.getToken());
  }


  logout() {
    this.authService.logout();
    window.location.reload();
  }


}
