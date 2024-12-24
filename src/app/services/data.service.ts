import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ICategories, IProducts, user } from '../models/products';
import { catchError, of, Subscription, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private readonly apiUrl = 'https://fakestoreapi.com';

  constructor(private http: HttpClient) { }

  public getProducts(): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${this.apiUrl}/products`).pipe(
      catchError(this.handleError)
    );;
  }

  public getCategories(): Observable<ICategories[]> {
    return this.http.get<ICategories[]>(`${this.apiUrl}/products/categories`).pipe(
      catchError(this.handleError)
    );;
  }

  public getProductsById(id: number): Observable<IProducts> {
    return this.http.get<IProducts>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );;
  }

  public getProductsByСategory(category: ICategories): Observable<IProducts[]> {
    return this.http.get<IProducts[]>(`${this.apiUrl}/products/category/${category}`).pipe(
      catchError(this.handleError)
    );;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      console.error('Authorization error: 401');
    } else {
      console.error(`Error: ${error.status}, ${error.message}`);
    }
    return throwError(() => new Error('An error has occurred. Please try again.'));
  }



}
