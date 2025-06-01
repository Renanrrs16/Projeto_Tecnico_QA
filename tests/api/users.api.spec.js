import { test, expect } from '../support/index.js';
import userData from '../support/fixtures/users.json' assert { type: 'json' };

test.describe('Users API Tests', () => {
    
    test('should create user successfully', async ({ request }) => {
        const { response, user } = await request.api.createUser(userData.validUser);
        
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        expect(body.message).toBe('Cadastro realizado com sucesso');
        expect(body._id).toBeDefined();

        
        if (body._id) {
            
            await request.api.ensureValidToken(
                userData.existingUser.email, 
                userData.existingUser.password
            );
            await request.api.deleteUser(body._id);
        }
    });

    test('should list all users', async ({ request }) => {
        
        await request.api.ensureValidToken(
            userData.existingUser.email, 
            userData.existingUser.password
        );
        
        const users = await request.api.getAllUsers();
        
        expect(Array.isArray(users)).toBeTruthy();
        expect(users.length).toBeGreaterThan(0);
        expect(users[0]).toHaveProperty('nome');
        expect(users[0]).toHaveProperty('email');
    });

    test('should get user by ID', async ({ request }) => {
        
        const { response: createResponse } = await request.api.createUser(userData.adminUser);
        const createBody = await createResponse.json();
        
        
        await request.api.ensureValidToken(
            userData.existingUser.email, 
            userData.existingUser.password
        );
        
        const user = await request.api.getUserById(createBody._id);
        
        expect(user.nome).toBeDefined();
        expect(user.email).toBeDefined();

        
        if (createBody._id) {
            await request.api.deleteUser(createBody._id);
        }
    });
});