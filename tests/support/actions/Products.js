import { expect } from "@playwright/test";

export class Products {
    
    constructor(page) {
        this.page = page;
    }

    // Métodos existentes
    async goToProducts() {
        await this.page.getByTestId('cadastrar-produtos').click();
    }

    async addProductToCart(productName) {
        await this.page.getByText(productName).first().click();
        await this.page.getByTestId('adicionarNaLista').click();
    }

    async goToCart() {
        await this.page.getByTestId('carrinho').click();
    }

    async validateProductInCart(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async removeProductFromCart() {
        await this.page.getByText('Remover').first().click();
    }

    async validateEmptyCart() {
        await expect(this.page.getByText('Seu carrinho está vazio')).toBeVisible();
    }


    // Novos métodos para cadastro de produtos
    async goToProductRegistration() {
        await this.page.getByTestId('cadastrar-produtos').click();
    }

    async fillProductForm(productData) {
        await this.page.getByTestId('nome').fill(productData.nome);
        await this.page.getByTestId('preco').fill(productData.preco.toString());
        await this.page.getByTestId('descricao').fill(productData.descricao);
        await this.page.getByTestId('quantity').fill(productData.quantidade.toString());
    }

    async submitProductForm() {
        await this.page.getByTestId('cadastarProdutos').click();
    }

    async validateSuccessMessage() {
        await expect(this.page.getByText('Cadastro realizado com sucesso')).toBeVisible();
    }

    async validateErrorMessage(message) {
        await expect(this.page.getByText(message)).toBeVisible();
    }

    async validateProductNotFound() {
        await expect(this.page.getByText('Nenhum produto foi encontrado')).toBeVisible();
    }

    async goToProductList() {
        await this.page.getByTestId('listar-produtos').click();
    }

    async validateProductInList(productName) {
        await expect(this.page.getByText(productName)).toBeVisible();
    }

    async validatePriceInList(price) {
        await expect(this.page.getByText(price)).toBeVisible();
    }
}