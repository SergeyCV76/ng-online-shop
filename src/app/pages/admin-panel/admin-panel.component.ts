import { basket } from './../../models/basket';
import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { DataService } from '../../services/data.service';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { Subscription } from 'rxjs';

const today = new Date();
const month = today.getMonth();
const year = today.getFullYear();

@Component({
  selector: 'app-admin-panel',
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDividerModule,
    MatInputModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatTableModule,
  ],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent implements OnInit {
  private listVasketsSubscription: Subscription | undefined;
  public loading = signal(false);
  public basketData = signal<basket[]>([]);
  public sumBasket = signal(0);
  public displayedColumns: string[] = [
    'productId',
    'productTitle',
    'quantity',
    'price',
    'Sum',
  ];

  public formDateSelection: FormGroup = new FormGroup({
    // start: new FormControl(new Date(year, month, 15)),
    // end: new FormControl(new Date(year, month, 19)),
    start: new FormControl(new Date(2020, 0, 1)),
    end: new FormControl(new Date(2020, 0, 31)),
  });

  constructor(private dataService: DataService) {}

  ngOnInit() {}

  ngOnDestroy() {
    if (this.listVasketsSubscription) this.listVasketsSubscription.unsubscribe;
  }

  public getListBaskets() {
    this.loading.set(true);

    this.basketData().splice(0, this.basketData().length);
    this.setSumBasket();

    const startdate: Date = this.formDateSelection.value.start;
    const enddate: Date = this.formDateSelection.value.end;

    this.listVasketsSubscription = this.dataService
      .getCartsWithDetails(startdate, enddate)
      .pipe()
      .subscribe((data) => {
        console.log(data);
        this.basketData.set(data);
        this.setSumBasket();

        data.forEach((element) => {
          element.sum = element.products.reduce(
            (sum, current) => sum + current.price * current.quantity,
            0
          );
        });

        this.loading.set(false);
      });
  }

  public setSumBasket() {
    let totalSum: number = 0;

    this.basketData().forEach((element) => {
      totalSum =
        totalSum +
        element.products.reduce(
          (sum, current) => sum + current.price * current.quantity,
          0
        );
    });

    this.sumBasket.set(totalSum);
  }
}
