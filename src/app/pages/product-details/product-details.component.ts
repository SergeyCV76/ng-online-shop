import { Component, OnInit } from '@angular/core';
import { IProducts } from '../../models/products';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [MatCardModule, MatIconModule, MatDividerModule, CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {

  public product: IProducts | undefined;
  private productSubscription: Subscription | undefined;

  constructor( private route: ActivatedRoute){}

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


}
