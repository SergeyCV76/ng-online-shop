
import { DataService } from './../../services/data.service';
import { ActivatedRouteSnapshot, Resolve, ResolveFn, Router, RouterStateSnapshot } from '@angular/router';
import { IProducts } from '../../models/products';
import { catchError, EMPTY, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })

export class ProductDetailsResolver implements Resolve<IProducts> {
  constructor(private dataService: DataService, private router: Router) {}
   resolve(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot
  ): Observable<IProducts> {
    return this.dataService.getProductsById(route.params?.['id']).pipe(
      catchError(() => {
        this.router.navigate(["products"]);
        return EMPTY;
      })
    );
  }
}
