import { Component, OnInit } from '@angular/core';
import {Menu, MENUITEMS} from './navbar-items';
import {MenuService} from "../../../services/menu.service";
import {BannerService} from "../../../services/banner.service";
import {BannerDto} from "../../../model/banner.dto";
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  
  public menuItems: Menu[];
  public toggleNavBar : boolean = false;
  bannerList: any[];
  images: any[];

  constructor(
      private menuService: MenuService,
      private bannerService: BannerService)
  {
    this.menuService.getAllMainMenu().subscribe(value => {
      this.menuItems = value.filter(menuItem => menuItem);
    });

    this.bannerService.getLargeBannerList().subscribe(value => {
      this.bannerList = value;
      value.forEach( banner => {

        console.log('images:', JSON.stringify(this.images));
        this.images = banner.images;
      })
    });

    console.log(JSON.stringify(this.menuItems));
  }

  ngOnInit() {


      //
      // this.menuItems = MENUITEMS.filter(menuItem => menuItem);
  }

  toggleNav() {
    this.toggleNavBar = !this.toggleNavBar
  }

}
