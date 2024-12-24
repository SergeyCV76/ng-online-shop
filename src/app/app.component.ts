import { Component, OnInit } from '@angular/core';
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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
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
    constructor(public formLogin: MatDialog) {}

    ngOnInit() {}

    openDialog() {

    let formLoginConfig = new MatDialogConfig();
    formLoginConfig.width = '500px';
    this.formLogin.open(UserLoginComponent, formLoginConfig);

  }
}
