import { products } from './../../models/products';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { Subscription } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterLink } from '@angular/router';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { ICategories } from '../../models/categories';
import { basket } from '../../models/basket';
import { user } from '../../models/user';

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
    RouterLink,
    MatProgressBarModule,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsComponent implements OnInit {
  public categories = signal<ICategories[] | undefined>(undefined);
  private categoriesSubscription: Subscription | undefined;

  public products = signal<products[] | undefined>(undefined);
  private productsSubscription: Subscription | undefined;

  public loading = signal(false);
  public error = signal<string | null>(null);

  private valSort = '1';
  public isDisabledBasket = signal(false);
  private basket: basket = new basket();

  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  public pageIndex = signal(0);
  public pageSize = signal(4);
  public pageSizeOptions: number[] = [4, 8, 16, 32];

  constructor(
    private dataService: DataService,
    private router: Router,
    public formLogin: MatDialog
  ) {}

  ngOnInit() {
    this.loading.set(true);
    this.error.set(null);

    this.getCategories();
    this.getProducts();
  }

  ngOnDestroy() {
    if (this.categoriesSubscription) this.categoriesSubscription.unsubscribe;
    if (this.productsSubscription) this.productsSubscription.unsubscribe;
  }

  private getCategories(): void {
    this.categoriesSubscription = this.dataService
      .getCategories()
      .pipe()
      .subscribe((data) => {
        this.categories.set(data);
        this.loading.set(false);
      });
  }

  private getProducts(): void {
    this.isDisabledBasket.set(true);
    this.productsSubscription = this.dataService
      .getProducts()
      .pipe()
      .subscribe((data) => {
        this.products.set(data);
        this.sortProducts();
        this.loading.set(false);
        this.isDisabledBasket.set(false);
      });
  }

  public getProductsByCategory(category: ICategories): void {
    if (category === 'all') {
      this.getProducts();
    } else {
      this.isDisabledBasket.set(true);
      this.productsSubscription = this.dataService
        .getProductsByСategory(category)
        .pipe()
        .subscribe((data) => {
          this.products.set(data);
          this.sortProducts();
          this.paginator?.firstPage();
          this.isDisabledBasket.set(false);
        });
    }
  }

  public onSelectValueSort(val: any): void {
    this.valSort = val.value;
    this.sortProducts();
  }

  private sortProducts(): void {
    const filteredcСrds = computed(() => {
      // const filtered = todos().filter(todo => showCompleted() || !todo.completed);
      // return filtered.sort((a, b) => a.id - b.id);
      if (this.valSort === '1') {
        return this.products()?.sort((a, b) => a.price - b.price);
      } else {
        return this.products()?.sort((a, b) => b.price - a.price);
      }
    });
    this.products.update(filteredcСrds);
  }

  public addProductToBasket(product: products) {
    const currentUser: user = this.dataService.currentUser;

    if (currentUser.id > 0) {
      this.isDisabledBasket.set(true);

      this.dataService.addProductToBasket(product).subscribe((data) => {
        this.isDisabledBasket.set(false);

        this.basket = data;

        const countBasket: number = this.basket.products.length;
        this.dataService.countBasket = countBasket;

        this.basket.products.map((item) => {
          if (item.productId === product.id) {
            item.productTitle = product.title;
            item.price = product.price;
            item.productImage = product.image;
          }
        });

        this.dataService.currentBasket = this.basket;
        this.dataService.updateBadgeCount(this.dataService.countBasket);
      });
    } else {
      let formLoginConfig = new MatDialogConfig();
      formLoginConfig.width = '500px';
      this.formLogin.open(UserLoginComponent, formLoginConfig);
    }
  }

  public openingDetailPage() {
    this.isDisabledBasket.set(true);
  }

  public paginatedProducts(): products[] | undefined {
    const startIndex = this.pageIndex() * this.pageSize();
    return this.products()?.slice(startIndex, startIndex + this.pageSize());
  }

  public onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }
}
