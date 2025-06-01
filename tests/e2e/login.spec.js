import { test, expect } from '../support/index.js';
import userData from '../support/fixtures/users.json' assert { type: 'json' };

test.describe('Login E2E Tests', () => {
    
    test('should login successfully with valid credentials', async ({ page }) => {
        await page.login.visit();
        await page.login.submit(userData.existingUser.email, userData.existingUser.password);
        await page.login.validateSuccessfulLogin();
    });

    test('should show error with invalid credentials', async ({ page }) => {
        await page.login.visit();
        await page.login.submit('invalid@email.com', 'wrongpassword');
        await page.login.validateLoginError('Email e/ou senha inválidos');
    });

    test('should logout successfully', async ({ page }) => {
        await page.login.visit();
        await page.login.submit(userData.existingUser.email, userData.existingUser.password);
        await page.login.validateSuccessfulLogin();
        await page.login.logout();
        await expect(page.getByTestId('entrar')).toBeVisible();
    });
});