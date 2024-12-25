import { Component, OnInit, signal } from '@angular/core';
import { basket, products, user } from '../../models/products';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/data.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserLoginComponent } from '../user-login/user-login.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatIconModule, MatDividerModule, CommonModule, MatProgressBarModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  public product: products = new products;
  private productSubscription: Subscription | undefined;
  public isDisabledBasket = signal(false);
  private basket: basket = new basket

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    public formLogin: MatDialog
  ){}

  ngOnInit(){
    this.getProduct();
  }

  ngOnDestroy(){
    if(this.productSubscription) this.productSubscription.unsubscribe
  }

  getProduct(){
    this.productSubscription = this.route.data.subscribe((data) => {
      this.product = data['data'];
    });
  }

  public addProductToBasket(){

      const currentUser: user = this.dataService.currentUser;

      if(currentUser.id > 0){
        this.isDisabledBasket.set(true);

        this.dataService.addProductToBasket(this.product).subscribe((data) => {
          this.isDisabledBasket.set(false);

          this.basket = data;
          const countBasket: number = this.basket.products.length

          this.dataService.countBasket = countBasket
          this.dataService.updateBadgeCount(this.dataService.countBasket);

        })
      }else{
        let formLoginConfig = new MatDialogConfig();
        formLoginConfig.width = '500px';
        this.formLogin.open(UserLoginComponent, formLoginConfig);
      }

    }


}
