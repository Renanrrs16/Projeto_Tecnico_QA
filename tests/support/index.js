import { test as base, expect } from '@playwright/test';
import { Login } from './actions/Login.js';
import { Users } from './actions/Users.js';
import { Products } from './actions/Products.js';
import { Api } from './api/index.js';

const test = base.extend({
    page: async ({ page }, use) => {
        page.login = new Login(page);
        page.users = new Users(page);
        page.products = new Products(page);
        await use(page);
    },
    request: async ({ request }, use) => {
        const api = new Api(request);
        
        
        try {
            await api.setToken();
            console.log('API initialized with authentication token');
        } catch (error) {
            console.warn('Failed to initialize API token:', error.message);
        }
        
        request.api = api;
        await use(request);
        
        
        api.clearToken();
    }
});

export { test, expect };