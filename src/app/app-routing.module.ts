import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CaddiesComponent } from './caddies/caddies.component';
import { LoginComponent } from './login/login.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products/products.component';


const routes: Routes = [
  {path: 'products/:p1/:p2', component: ProductsComponent},
  {path: 'product-detail/:url', component: ProductDetailComponent},
  {path: 'caddy', component: CaddiesComponent},
  {path: 'login', component: LoginComponent},
  { path: '', redirectTo: '/products/1/0', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
