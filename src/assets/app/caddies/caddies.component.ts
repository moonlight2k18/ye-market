import { Component, OnInit } from '@angular/core';
import { CaddyService } from '../services/caddy.service';

@Component({
  selector: 'app-caddies',
  templateUrl: './caddies.component.html',
  styleUrls: ['./caddies.component.scss']
})
export class CaddiesComponent implements OnInit {

  constructor(public caddyService: CaddyService) { }

  ngOnInit() {
    console.log("caddies", this.caddyService.getCurrentCaddy().items.values);
    console.warn("c2", this.caddyService.getCurrentCaddy().items.keys);
  }

}
