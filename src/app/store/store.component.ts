import { Component } from "@angular/core";
import { Product } from "../model/product.model";
import { ProductRepository } from "../model/product.repository";
import { Cart } from "../model/cart.model";

declare var module: {
    id: string;
}

@Component({
    selector: "store",
    moduleId: module.id,
    templateUrl: "store.component.html"
})
export class StoreComponent
{
    public selectedCategory: string = null;
    public productsPerPage: number = 4;
    public selectedPage: number = 1;

    constructor(private repository: ProductRepository, private cart: Cart) { }

    public get products(): Product[] {
        let pageIndex: number = (this.selectedPage - 1) * this.productsPerPage;
        return this.repository.getProducts(this.selectedCategory)
            .slice(pageIndex, pageIndex + this.productsPerPage);
    }

    public get categories(): string[] {
        return this.repository.getCategories();
    }

    public changeCategory(newCategory?: string): void {
        this.selectedCategory = newCategory;
        this.selectedPage = 1;
    }

    public changePage(newPage: number): void {
        this.selectedPage = newPage;
    }

    public changePageSize(newSize: number): void {
        this.productsPerPage = Number(newSize);
        this.changePage(1);
    }

    public get pageCount(): number {
        return Math.ceil(this.repository
            .getProducts(this.selectedCategory).length / this.productsPerPage);
    }

    public addProductToCart(product: Product): void {
        this.cart.addLine(product);
    }

    // public get pageNumbers(): number[] {
    //     return Array(Math.ceil(this.repository
    //         .getProducts(this.selectedCategory).length / this.productsPerPage))
    //             .fill(0).map((x, i) => i + 1);
    // }
}