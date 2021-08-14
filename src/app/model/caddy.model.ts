import { Client } from "./client.model";
import { ProductItem } from "./ProductItem.model";

export class Caddy{
    items: Map<number, ProductItem> =  new Map();
    public client: Client;

    constructor(public name: string){
        
    }
}