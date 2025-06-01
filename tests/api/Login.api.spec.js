import { test, expect } from '../support/index.js';
import userData from '../support/fixtures/users.json' assert { type: 'json' };

test.describe('Login API Tests', () => {
    
    test('should login successfully with valid credentials', async ({ request }) => {
        const response = await request.api.login(
            userData.existingUser.email, 
            userData.existingUser.password
        );
        
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.message).toBe('Login realizado com sucesso');
        expect(body.authorization).toBeDefined();
    });

    test('should return error with invalid credentials', async ({ request }) => {
        const response = await request.api.login('invalid@email.com', 'wrongpassword');
        
        expect(response.status()).toBe(401);
        const body = await response.json();
        expect(body.message).toBe('Email e/ou senha inválidos');
    });

    test('should return error with missing credentials', async ({ request }) => {
        const response = await request.api.login('', '');
        
        expect(response.status()).toBe(400);
        const body = await response.json();
        expect(body.email).toBe('email não pode ficar em branco');
        expect(body.password).toBe('password não pode ficar em branco');
    });
});