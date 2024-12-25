import { Component, Input, OnInit, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserLoginComponent } from './pages/user-login/user-login.component';
import { MatBadgeModule } from '@angular/material/badge';
import { DataService } from './services/data.service';


@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    MatInputModule,
    MatBadgeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{

  public countBasket: number = 0;

  public navItems =
  [
    {
      title: 'Main',
      route: '',
      icon: 'dashboard',
    },
    {
      title: 'Products',
      route: 'products',
      icon: 'apps',
    },
    {
      title: 'Basket',
      route: 'basket',
      icon: 'shopping_cart',
    },
    {
      title: 'Admin Panel',
      route: 'adminPanel',
      icon: 'admin_panel_settings',
    },
  ]
    constructor(
      public formLogin: MatDialog,
      private dataService: DataService,
    ) {}

    ngOnInit() {
      this.setCountBasket()
    }

    openDialog() {
      let formLoginConfig = new MatDialogConfig();
      formLoginConfig.width = '500px';
      this.formLogin.open(UserLoginComponent, formLoginConfig);
    }

    public setCountBasket(): void {
      this.dataService.currentBadgeCount.subscribe(count => this.countBasket = count);
    }


}
