import { test, expect } from '../support/index.js';
import productData from '../support/fixtures/products.json' assert { type: 'json' };
import userData from '../support/fixtures/users.json' assert { type: 'json' };

test.describe('Products API Tests', () => {
    

    test('should create product successfully', async ({ request }) => {
        
        await request.api.ensureValidToken(
            userData.existingUser.email, 
            userData.existingUser.password
        );

        const uniqueProduct = {
            ...productData.validProduct,
            nome: `${productData.validProduct.nome} ${Date.now()}_${Math.random().toString(36).substring(7)}`
        };

        const response = await request.api.createProduct(uniqueProduct);
        
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.message).toBe('Cadastro realizado com sucesso');
        expect(body._id).toBeDefined();

       
        if (body._id) {
            await request.api.deleteProduct(body._id);
        }
    });

    test('should list all products', async ({ request }) => {
        const products = await request.api.getAllProducts();
        
        expect(Array.isArray(products)).toBeTruthy();
        expect(products.length).toBeGreaterThan(0);
        expect(products[0]).toHaveProperty('nome');
        expect(products[0]).toHaveProperty('preco');
    });

    test('should get product by ID', async ({ request }) => {
        const products = await request.api.getAllProducts();
        
        if (products.length === 0) {
            
            await request.api.ensureValidToken(
                userData.existingUser.email, 
                userData.existingUser.password
            );
            
            const testProduct = {
                ...productData.validProduct,
                nome: `Test Product ${Date.now()}`
            };
            
            const createResponse = await request.api.createProduct(testProduct);
            const createBody = await createResponse.json();
            
            const product = await request.api.getProductById(createBody._id);
            expect(product.nome).toBe(testProduct.nome);
            expect(product.preco).toBe(testProduct.preco);
            
            
            await request.api.deleteProduct(createBody._id);
        } else {
            const firstProduct = products[0];
            const product = await request.api.getProductById(firstProduct._id);
            
            expect(product.nome).toBe(firstProduct.nome);
            expect(product.preco).toBe(firstProduct.preco);
            expect(product._id).toBe(firstProduct._id);
        }
    });
});