import { test, expect } from '../support/index.js';
import userData from '../support/fixtures/users.json' assert { type: 'json' };

test.describe('User Registration E2E Tests', () => {
    
    test('should register new user successfully', async ({ page }) => {
        const uniqueUser = {
            ...userData.validUser,
            email: `test_e2e_${Date.now()}@teste.com`
        };

        await page.login.visit();
        await page.users.registerUser(uniqueUser);
        await page.users.validateSuccessfulRegistration('Cadastro realizado com sucesso');
    });

    test('should show error when registering with existing email', async ({ page }) => {
        await page.login.visit();
        await page.users.registerUser(userData.existingUser);
        await page.users.validateRegistrationError('Este email já está sendo usado');
    });

    test('should register admin user successfully', async ({ page }) => {
        const uniqueAdmin = {
            ...userData.adminUser,
            email: `admin_e2e_${Date.now()}@teste.com`
        };

        await page.login.visit();
        await page.users.registerUser(uniqueAdmin);
        await page.users.validateSuccessfulRegistration('Cadastro realizado com sucesso');
    });
});