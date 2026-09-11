import { Page, expect } from '@playwright/test';

export class InventoryPage{
    
    constructor(private readonly page: Page) {}

    async addToCart(productname: string){
        await this.page.locator(`[data-test="add-to-cart-${productname}"]`).click();
    }
    async openCart(){
        await this.page.locator('[data-test="shopping-cart-link"]').click();
    }
    async checkProductInCart(productname: string){
        await expect ( 
            this.page.locator('.cart_item').filter({hasText: productname})
        ).toBeVisible();
    }

    async checkProductsInCart(productnames : string[]){
        for(const name of productnames){
            await this.checkProductInCart(name);
        }
    }
    async checkCartNumber(n : number){
        await expect (this.page.locator('[data-test="shopping-cart-badge"]')).toHaveText(String(n));
    }
}