import { test, expect } from '../support/index.js';
import userData from '../support/fixtures/users.json' assert { type: 'json' };
import productData from '../support/fixtures/products.json' assert { type: 'json' };

test.describe('Product Registration E2E Tests', () => {
    
    test.beforeEach(async ({ page }) => {
        await page.login.visit()
        await page.login.submit(userData.existingUser.email, userData.existingUser.password);
        await page.login.validateSuccessfulLogin();
        await page.products.goToProducts();
    });

   
    test('should register a new product successfully with valid data', async ({ page }) => {
        const uniqueProductName = `${productData.validProduct.nome} ${Date.now()}`;
        
        await page.getByTestId('cadastrar-produtos').click();
        
        await page.getByTestId('nome').fill(uniqueProductName);
        await page.getByTestId('preco').fill(productData.validProduct.preco.toString());
        await page.getByTestId('descricao').fill(productData.validProduct.descricao);
        await page.getByTestId('quantity').fill(productData.validProduct.quantidade.toString());
        
        await page.getByTestId('cadastarProdutos').click();
        
        await expect(page.getByText(uniqueProductName)).toBeVisible();
    });

    test('should register expensive product successfully', async ({ page }) => {
        const uniqueExpensiveProduct = `${productData.expensiveProduct.nome} ${Date.now()}`;
        
        await page.getByTestId('cadastrar-produtos').click();
        
        await page.getByTestId('nome').fill(uniqueExpensiveProduct);
        await page.getByTestId('preco').fill(productData.expensiveProduct.preco.toString());
        await page.getByTestId('descricao').fill(productData.expensiveProduct.descricao);
        await page.getByTestId('quantity').fill(productData.expensiveProduct.quantidade.toString());
        
        await page.getByTestId('cadastarProdutos').click();
        

        await expect(page.getByText(uniqueExpensiveProduct)).toBeVisible();
        await expect(page.getByRole('cell', { name: '9988' }).first()).toBeVisible();
    });

    
    test('should not register product with empty required fields', async ({ page }) => {
        await page.getByTestId('cadastrar-produtos').click();
        
        
        await page.getByTestId('cadastarProdutos').click();
        
       
        await expect(page.getByText('Nome é obrigatório')).toBeVisible();
        await expect(page.getByText('Preco é obrigatório')).toBeVisible();
        await expect(page.getByText('Descricao é obrigatório')).toBeVisible();
        await expect(page.getByText('Quantidade é obrigatório')).toBeVisible();
    });

});