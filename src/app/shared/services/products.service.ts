import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../classes/product';
import { BehaviorSubject, Observable, of, Subscriber} from 'rxjs';
import { map} from 'rxjs/operators';
import 'rxjs/add/operator/map';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

// Get product from Localstorage
const products = JSON.parse(localStorage.getItem('compareItem')) || [];

const httpOptionsJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const apiEndpoint = environment.apiEndPoint;



@Injectable()

export class ProductsService {

  private stockProductURL = apiEndpoint + 'api/shop/stock';

  public currency = 'USD';
  public catalogMode = false;



  public compareProducts: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public observer:  Subscriber<{}>;

  // Initialize
  constructor(private  http: HttpClient, private toastrService: ToastrService) {
     this.compareProducts.subscribe(products => products = products);
  }

  // Observable Product Array
  private products(): Observable<Product[]> {
     // return this.http.get(this.stockProductURL + '/list').map((res: any) => res.json());
    return this.http.get<Product[]>(this.stockProductURL + '/list', httpOptionsJson );
  }

  // Get Products
  public getProducts(): Observable<Product[]> {
    return this.products();
  }


  public  getProductListTest(): Observable<Product[]> {
    return this.http.get<Product[]>(this.stockProductURL + '/list', httpOptionsJson );
  }

  // Get Products By Id
  public getProduct(id: number): Observable<Product> {
    return this.products().pipe(map(items => items.find((item: Product) => item.id === id)));
  }

   // Get Products By category
  public getProductByCategory(category: string): Observable<Product[]> {
    return this.products().pipe(map(items =>
       items.filter((item: Product) => {
         if (category === 'all') {
            return item;
         } else {
            return item.category === category;
         }

       })
     ));
  }

   /*
      ---------------------------------------------
      ----------  Compare Product  ----------------
      ---------------------------------------------
   */

  // Get Compare Products
  public getComapreProducts(): Observable<Product[]> {
    const itemsStream = new Observable(observer => {
      observer.next(products);
      observer.complete();
    });
    return <Observable<Product[]>>itemsStream;
  }

  // If item is aleready added In compare
  public hasProduct(product: Product): boolean {
    const item = products.find(item => item.id === product.id);
    return item !== undefined;
  }

  // Add to compare
  public addToCompare(product: Product): Product | boolean {
    let item: Product | boolean = false;
    if (this.hasProduct(product)) {
      item = products.filter(item => item.id === product.id)[0];
      const index = products.indexOf(item);
    } else {
      if (products.length < 4) {
        products.push(product);
      } else {
        this.toastrService.warning('Maximum 4 products are in compare.');
      } // toasr services
    }
      localStorage.setItem('compareItem', JSON.stringify(products));
      return item;
  }

  // Removed Product
  public removeFromCompare(product: Product) {
    if (product === undefined) { return; }
    const index = products.indexOf(product);
    products.splice(index, 1);
    localStorage.setItem('compareItem', JSON.stringify(products));
  }

}
