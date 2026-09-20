import { Page, expect } from '@playwright/test';

export class InventoryPage{
    
    constructor(private readonly page: Page) {}

    async addToCart(productname: string){
        await this.page.locator(`[data-test="add-to-cart-${productname}"]`).click();
    }
    async removefromCart(productname:string){
        await this.page.locator(`[data-test="remove-${productname}"]`).click();
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
        const badge = this.page.locator('[data-test="shopping-cart-badge"]');
        if(n == 0){
            await expect(badge).toHaveCount(0);
        }
        else{
            await expect(badge).toHaveText(String(n));
        }
    }

    async openMenu(){
        await this.page.getByRole('button', { name: 'Open Menu' }).click();
    }

    async logout(){
        await this.page.locator('[data-test="logout-sidebar-link"]').click();
    }

    async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.page.locator('[data-test="product-sort-container"]').selectOption(value);
    }

    async getFirstProductName() {
        return this.page.locator('.inventory_item_name').first().textContent();
    }
    
}