import { expect } from "@playwright/test";

export class Login {
    
    constructor(page) {
        this.page = page;
    }

    async visit() {
        await this.page.goto(process.env.BASE_URL);
    }

    async submit(email, password) {
        await this.page.getByTestId('email').fill(email);
        await this.page.getByTestId('senha').fill(password);
        await this.page.getByTestId('entrar').click();
    }

    async logout() {
        await this.page.getByTestId('logout').click();
    }

    async validateSuccessfulLogin() {
        await expect(this.page.getByTestId('logout')).toBeVisible();
        await expect(this.page.url()).toContain('/home');
    }

    async validateLoginError(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}