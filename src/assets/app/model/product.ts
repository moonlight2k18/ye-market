export interface Product {
    id: number;
    name: string;
    description: string;
    currentPrice: number;
    promotion: boolean;
    selected: boolean;
    available: boolean;
    quantity: number;
    _links:{
        self:{
            href: string
        },
        product:{
            href: string;
        },
        category:{
            href: string;
        }
    }

}
