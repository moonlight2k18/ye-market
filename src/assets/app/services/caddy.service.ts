import { Injectable } from '@angular/core';
import { Caddy } from '../model/caddy.model';
import { Product } from '../model/product';
import { ProductItem } from '../model/ProductItem.model';

@Injectable({
  providedIn: 'root'
})
export class CaddyService {
  private currentCaddyName: string = "Caddy1";
  private caddies: Map<string, Caddy> = new Map();

  constructor() {
    let caddies  = localStorage.getItem("myCaddies");
    console.warn(caddies);

      let caddy: Caddy = new Caddy(this.currentCaddyName);
      this.caddies.set(this.currentCaddyName, caddy);
      //this.saveCaddy();
  }


  public addProductToCaddy(product: Product) {
    let caddy = this.caddies.get(this.currentCaddyName);
    let productItem: ProductItem = caddy.items.get(product.id);

    if (productItem) {
      productItem.quantity += product.quantity;
    }
    else {
      let productItem: ProductItem = new ProductItem();
      productItem.price = product.currentPrice;
      productItem.quantity = product.quantity;
      productItem.product = product;
    }

    caddy.items.set(product.id, productItem);
    this.caddies.set(this.currentCaddyName, caddy);
    //this.saveCaddy();
  }

  public getCurrentCaddy() {
    return this.caddies.get(this.currentCaddyName);
  }
/*
  public saveCaddy() {
    localStorage.setItem("myCaddies", JSON.stringify(Array.from(this.caddies)));
  } */

  public getTotal() {
    let total = 0;

    const pi = this.getCurrentCaddy().items.values();

    for (let item of pi) {
      total += item.price * item.quantity;
    }

    return total;
  }

}
