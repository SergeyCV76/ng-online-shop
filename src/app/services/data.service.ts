import { basketProduct } from './../models/basket';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { basket } from '../models/basket';
import {
  BehaviorSubject,
  catchError,
  forkJoin,
  map,
  switchMap,
  throwError,
} from 'rxjs';
import { ICategories } from '../models/categories';
import { products } from '../models/products';
import { user } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private readonly apiUrl = 'https://fakestoreapi.com';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  public currentUser: user = new user();
  public allUsers: user[] = [];
  public countBasket: number = 0;
  public currentBasket: basket = new basket();

  private badgeCountSource = new BehaviorSubject<number>(0);
  currentBadgeCount = this.badgeCountSource.asObservable();

  constructor(private http: HttpClient) {}

  public updateBadgeCount(count: number) {
    this.badgeCountSource.next(count);
  }

  public getProducts(): Observable<products[]> {
    return this.http
      .get<products[]>(`${this.apiUrl}/products`)
      .pipe(catchError(this.handleError));
  }

  public getCategories(): Observable<ICategories[]> {
    return this.http
      .get<ICategories[]>(`${this.apiUrl}/products/categories`)
      .pipe(catchError(this.handleError));
  }

  public getProductsById(id: number): Observable<products> {
    return this.http
      .get<products>(`${this.apiUrl}/products/${id}`)
      .pipe(catchError(this.handleError));
  }

  public getProductsByСategory(category: ICategories): Observable<products[]> {
    return this.http
      .get<products[]>(`${this.apiUrl}/products/category/${category}`)
      .pipe(catchError(this.handleError));
  }

  public userlogin(user: user): Observable<user> {
    return this.http
      .post<user>(
        `${this.apiUrl}/auth/login`,
        JSON.stringify(user),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public getAllUser(): Observable<user[]> {
    return this.http
      .get<user[]>(`${this.apiUrl}/users/`)
      .pipe(catchError(this.handleError));
  }

  public addProductToBasket(product: products): Observable<basket> {
    const myRequest = {
      userId: this.currentUser.id,
      date: new Date().setHours(0, 0, 0, 0),
      products: [{ productId: product.id, quantity: 1 }],
    };

    return this.http
      .post<basket>(
        `${this.apiUrl}/carts`,
        JSON.stringify(myRequest),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public updProductToBasket(product: basketProduct): Observable<basket> {
    const myRequest = {
      userId: this.currentUser.id,
      date: new Date().setHours(0, 0, 0, 0),
      products: [{ productId: product.productId, quantity: product.quantity }],
    };

    return this.http
      .put<basket>(
        `${this.apiUrl}/carts/${this.currentBasket.id}`,
        JSON.stringify(myRequest),
        this.httpOptions
      )
      .pipe(catchError(this.handleError));
  }

  public delBasket(): Observable<any> {
    return this.http
      .delete<any>(`${this.apiUrl}/carts/${this.currentBasket.id}`)
      .pipe(catchError(this.handleError));
  }

  public setCurrentUser(user: user): void {
    this.currentUser = user;
  }

  public getCurrentUser(): user {
    return this.currentUser;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Authorization error: 401');
    } else {
      console.error(`Error: ${error.status}, ${error.message}`);
    }
    return throwError(
      () => new Error('An error has occurred. Please try again.')
    );
  }

  public getListBaskets(startdate: Date, enddate: Date): Observable<basket[]> {
    return this.http
      .get<basket[]>(
        `${this.apiUrl}/carts?startdate=${this.formatDate(
          startdate
        )}&enddate=${this.formatDate(enddate)}`
      )
      .pipe(catchError(this.handleError));
  }

  public getUserById(id: number): Observable<user> {
    return this.http
      .get<user>(`${this.apiUrl}/users/${id}`)
      .pipe(catchError(this.handleError));
  }

  public formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  getCartsWithDetails(startdate: Date, enddate: Date): Observable<basket[]> {
    return this.getListBaskets(startdate, enddate).pipe(
      switchMap((carts) => {
        const userRequests = carts.map((cart) => this.getUserById(cart.userId));
        const productRequests = carts.flatMap((cart) =>
          cart.products.map((item) => this.getProductsById(item.productId))
        );

        return forkJoin([
          forkJoin(userRequests),
          forkJoin(productRequests),
        ]).pipe(
          map(([users, products]) => {
            return carts.map((cart) => {
              cart.user = users.find((user) => user.id === cart.userId);
              cart.products = cart.products.map((item) => {
                item.price = products.find(
                  (product) => product.id === item.productId
                )!.price;
                item.productTitle = products.find(
                  (product) => product.id === item.productId
                )!.title;
                item.productImage = products.find(
                  (product) => product.id === item.productId
                )!.image;
                return item;
              });
              return cart;
            });
          })
        );
      })
    );
  }
}
