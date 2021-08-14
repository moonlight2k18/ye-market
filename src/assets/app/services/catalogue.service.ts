import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class CatalogueService {
  //public host = 'http://localhost:8080';
  public host = 'https://youssfi-ecom-v1.herokuapp.com'

  constructor(private httpClient: HttpClient) { }

  // Methode generic de recuperation de ressources
  public getResource(url){
    return this.httpClient.get(this.host+url);
  }


  public getProduct(url): Observable<Product>{
    return this.httpClient.get<Product>(url);
  }

  //UPLOAD PHOTO TO BACKEND
  uploadPhotoProduct(file: File, idProduct): Observable<HttpEvent<{}>>{
    let formData: FormData = new FormData();
    formData.append('file', file);
    //PREP THE REQUEST FORM DATA

    const req = new HttpRequest('POST', this.host+'/uploadPhoto/'+idProduct, formData, {
      reportProgress: true, //REPORT PROGRESS FOR VISUAL PROGRESS BAR
      responseType: "text" // THIS DEFAULTS TO JSON, SET IT TO TEXT
    });

    return this.httpClient.request(req);
  }





 
}
