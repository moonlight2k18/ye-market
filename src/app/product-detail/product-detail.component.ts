import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../model/product';
import { AuthenticationService } from '../services/authentication.service';
import { CaddyService } from '../services/caddy.service';
import { CatalogueService } from '../services/catalogue.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  public mode: number = 0;
  public currentProduct: Product;
  public editPhoto: boolean;
  selectedFiles: any;
  progress: number;
  currentFileUploaded: any;
  public title: string;

  public timeStamp;

  constructor(public catService: CatalogueService, private activatedRoute: ActivatedRoute, 
    public authService: AuthenticationService, private caddyService: CaddyService) { }

  ngOnInit() {
    this.loadData();
  }


  loadData(){
    const url = atob(this.activatedRoute.snapshot.params.url);
    this.catService.getProduct(url)
        .subscribe(data=>{
          this.currentProduct = data;
          console.log(this.currentProduct)
        }, err=>{
          console.error(err);
        })
  }

  
  onEditPhoto() {
    this.editPhoto = true;
  }

  onSelectedFile(event) {
    this.selectedFiles = event.target.files;
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

  onAddProductToCaddy(product: Product){
    this.caddyService.addProductToCaddy(product);
  }
  getTS(){
    return this.timeStamp;
  }


}
