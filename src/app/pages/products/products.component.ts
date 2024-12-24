
import { ChangeDetectionStrategy, Component, computed, OnInit, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterLink} from '@angular/router';
import { ICategories, IProducts } from '../../models/products';




@Component({
  selector: 'app-products',
  imports: [
    CommonModule,
    MatDividerModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatPaginator,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatIconModule,
    RouterLink
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class ProductsComponent implements OnInit{

  public categories = signal<ICategories[] | undefined>(undefined);
  private categoriesSubscription: Subscription | undefined;

  public products = signal<IProducts[] | undefined>(undefined);
  private productsSubscription: Subscription | undefined;

  public loading = signal(false);
  public error = signal<string | null>(null);

  private valSort = "1";


  constructor(
    private dataService: DataService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading.set(true)
    this.error.set(null)

    this.getCategories();
    this.getProducts();
  }

  ngOnDestroy(){
    if(this.categoriesSubscription) this.categoriesSubscription.unsubscribe
    if(this.productsSubscription) this.productsSubscription.unsubscribe
  }

  private getCategories(): void{
    this.categoriesSubscription = this.dataService.getCategories().pipe().subscribe(data => {
        this.categories.set(data)
        this.loading.set(false)
    })
  }

  private getProducts(): void{
    this.productsSubscription = this.dataService.getProducts().pipe().subscribe(data => {
      this.products.set(data)
      this.sortProducts()
      this.loading.set(false)
  })
  }

  public getProductsByCategory(category: ICategories): void{
    if(category === 'all'){
      this.getProducts();
    }else{
      this.productsSubscription = this.dataService.getProductsByСategory(category).pipe().subscribe(data => {
        this.products.set(data)
        this.sortProducts()
      })
    }
  }

  public onSelectValueSort(val: any): void{
    this.valSort = val.value;
    this.sortProducts();
  }

  private sortProducts(): void{
    const filteredcСrds = computed(() => {
      // const filtered = todos().filter(todo => showCompleted() || !todo.completed);
      // return filtered.sort((a, b) => a.id - b.id);
      if (this.valSort === "1"){
        return this.products()?.sort((a, b) => a.price - b.price);
      }else{
        return this.products()?.sort((a, b) => b.price - a.price);
      }
    });
    this.products.update(filteredcСrds);
  }
}
