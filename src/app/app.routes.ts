import { Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { BasketComponent } from './pages/basket/basket.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { UserLoginComponent } from './pages/user-login/user-login.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: 'basket', component: BasketComponent},
  {path: 'userLogin', component: UserLoginComponent},
  {path: 'adminPanel', component: AdminPanelComponent},
  {path: '**', redirectTo: '', component: MainComponent}
];
