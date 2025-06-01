import { expect } from "@playwright/test";

export class Users {
    
    constructor(page) {
        this.page = page;
    }

    async goToRegister() {
        await this.page.getByTestId('cadastrar').click();
    }

    async fillUserForm(user) {
        await this.page.getByTestId('nome').fill(user.nome);
        await this.page.getByTestId('email').fill(user.email);
        await this.page.getByTestId('password').fill(user.password);
        
        if (user.administrador) {
            await this.page.getByTestId('checkbox').check();
        }
    }

    async submitForm() {
        await this.page.getByTestId('cadastrar').click();
    }

    async validateSuccessfulRegistration(message) {
        await expect(this.page.getByText(message)).toContainText('Cadastro realizado com sucesso');
    }

    async validateRegistrationError(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async registerUser(user) {
        await this.goToRegister();
        await this.fillUserForm(user);
        await this.submitForm();
    }

    async validateSuccessfulRegistration(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }
}