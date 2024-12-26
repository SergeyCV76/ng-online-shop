import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { basketProduct, products } from '../../models/products';
import { DataService } from '../../services/data.service';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-basket',
  imports: [CommonModule, MatDividerModule, MatCardModule, MatProgressBarModule,MatButtonModule],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit{

  public basketNotEmpty: boolean = true
  public basketProducts = signal<basketProduct[] | undefined>(undefined);
  public isLoad = signal(false);
  public sumBasket = signal(0)

  constructor(
    private dataService: DataService,
  ) {}

  ngOnInit() {
    this.getProducts();
  }

  private getProducts(): void{

    const currentBasket = this.dataService.currentBasket;
    const basketProduct = currentBasket.products;

    this.basketProducts.set(basketProduct);
    this.setSumBasket()
  }

  public onClickPlus(product: basketProduct){

    this.isLoad.set(true);

    product.quantity++
    this.setSumBasket()

    this.dataService.updProductToBasket(product).subscribe((data) => {
      this.isLoad.set(false);
    })
  }


  public onClickMinus(product: basketProduct){

    this.isLoad.set(true);

    product.quantity--

    if(product.quantity === 0){
      const index: number = this.basketProducts()!.findIndex(item => item.productId === product.productId);
      if (index !== -1) {

        this.basketProducts()!.splice(index,1);

        const countBasket: number = this.basketProducts()!.length
        this.dataService.countBasket = countBasket
        this.dataService.updateBadgeCount(this.dataService.countBasket);
      }
    }

    if(this.basketProducts()!.length === 0){
      this.dataService.delBasket().subscribe((data) => {
        this.isLoad.set(false);
      })
    }else{
      this.dataService.updProductToBasket(product).subscribe((data) => {
        this.isLoad.set(false);
      })
    }

    this.setSumBasket()
  }

  public setSumBasket(){
    let totalSum: number = this.basketProducts()!.reduce((sum, current) => sum + current.price * current.quantity, 0);
    this.sumBasket.set(totalSum);
  }

}
