
import { DataService } from './../../services/data.service';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { products } from '../../models/products';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ProductDetailsResolver implements Resolve<products> {
  constructor(private dataService: DataService, private router: Router) {}
   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<products> {
    return this.dataService.getProductsById(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(["products"]);
        return EMPTY;
      })
    );
  }
}
