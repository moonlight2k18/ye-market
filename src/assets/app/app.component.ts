import { Component, OnInit } from '@angular/core';
import { CatalogueService } from './services/catalogue.service';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { CaddyService } from './services/caddy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public categories: any;
  public currentCategory;

  constructor(private catalogueService: CatalogueService, private router: Router, 
    public authService: AuthenticationService, public caddyService: CaddyService){

  }

  ngOnInit(): void {
    this.authService.loadAuthenticatedUserFromLocalStorage();
    this.getCategories();
  }

  private getCategories(){
    this.catalogueService.getResource('/categories')
        .subscribe(data=>{
          this.categories = data["_embedded"].categories;
        }, err=>{
          console.log(err);
        })
  }

  getProductsByCategory(c){
    this.currentCategory = c;
    this.router.navigateByUrl('products/2/'+c.id);
  }

  onSelectedProducts(){
    this.currentCategory = undefined;
    this.router.navigateByUrl("/");
  }

  onPromoProducts(){
    this.router.navigateByUrl('products/3/0');
    this.currentCategory = undefined;
  }

  onDispoProducts(){

    this.router.navigateByUrl('products/4/0');
    this.currentCategory = undefined;
  }


  onLogin(){
    this.router.navigateByUrl('/login');
  }

  onLogout(){
    this.authService.removeTokenFromLocalStorage();
    this.router.navigateByUrl('/login');
  }

  
}
