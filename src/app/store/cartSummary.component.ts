import { Component } from "@angular/core";
import { Cart } from "../model/cart.model";

declare var module: {
    id: string;
}

@Component({
    selector: "cart-summary",
    moduleId: module.id,
    templateUrl: "cartSummary.component.html"
})
export class CartSummaryComponent {
    constructor(public cart: Cart) { }
}