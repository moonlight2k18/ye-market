import { Component, OnInit } from '@angular/core';
import { CatalogueService } from '../services/catalogue.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { HttpEventType } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Product } from '../model/product';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  public products: any;
  public editPhoto: boolean;
  public currentProduct: any;
  selectedFiles: any;
  progress: number;
  currentFileUploaded: any;
  public title: string;

  public timeStamp;

  constructor(public catService: CatalogueService, private route: ActivatedRoute,
    private router: Router, public authService: AuthenticationService, 
    private caddyService: CaddyService) {
  }

  ngOnInit() {

    this.loadParams();
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        this.loadParams();      
      }
    })
  }

  loadParams(){
     // GET THE FIRST PARAM OF THE ROUTE
     let param1 = this.route.params["_value"].p1;
     console.log(param1);

     if (param1 == 1) { // IF param1 = 1, FETCH THE SELECTED PRODUCTS
       this.title = "Selection";
       this.getProducts('/products/search/selectedProducts');

     } else if (param1 == 2) { // IF param1 =2,  FETCH THE PRODUCTS ACCORDING TO THE GIVEN CATEGORY(param2)
       let idCategory = this.route.snapshot.params.p2;
       this.title = "Produits de la categorie "+idCategory;
       this.getProducts('/categories/' + idCategory + '/products');
     }
     else if (param1 == 3) {
       this.title = "Produits en promotion";
       this.getProducts('/products/search/dispoProducts');
     }
     else if (param1 == 4) {
       this.title = "Produits Disponibles";
       this.getProducts('/products/search/promoProducts');
     }
     else if (param1 == 5) {
       this.title = "Recherche...";
       this.getProducts('/products/search/dispoProducts');
     }
  }

  getProducts(url) {
    this.catService.getResource(url)
      .subscribe(data => {
        this.products = data["_embedded"].products;
      }, err => {
        console.log(err);
      })
  }

  onEditPhoto(product) {
    this.editPhoto = true;
    this.currentProduct = product;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
  }

  onDetailProduct(p: Product){
    const url = btoa(p._links.product.href);
    this.router.navigateByUrl('product-detail/'+url);
  }

  onAddProductToCaddy(product: Product){
    this.caddyService.addProductToCaddy(product);
  }

  getCurrentCaddy(){
    
  }


  uploadPhoto() {
    this.progress = 0;
    this.currentFileUploaded = this.selectedFiles.item(0);

    this.catService.uploadPhotoProduct(this.currentFileUploaded, this.currentProduct.id)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progress = Math.round(100 * event.loaded / event.total);
        } else {
          alert("Photo produit chargee avec succees.");
          this.timeStamp = Date.now();
        }
      }, err => {
        alert("Probleme de chargement " + JSON.parse(err.error).message);
      });
  }


  getTS(){
    return this.timeStamp;
  }
}
