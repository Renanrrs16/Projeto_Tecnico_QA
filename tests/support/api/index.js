import { expect } from "@playwright/test";
import dotenv from 'dotenv';

dotenv.config();

export class Api {
    constructor(request) {
        this.baseApi = process.env.BASE_API;
        this.request = request;
        this.token = undefined;
        this.isLoggingIn = false; 
    }

    async setToken(email = 'ren123@gmail.com', password = '1234567') {
        
        if (this.isLoggingIn) {
            
            while (this.isLoggingIn) {
                await new Promise(resolve => setTimeout(resolve, 100));
            }
            return;
        }

        this.isLoggingIn = true;
        
        try {
            console.log(`Attempting login with email: ${email}`);
            
            const response = await this.request.post(this.baseApi + '/login', {
                data: { email, password }
            });

            if (!response.ok()) {
                const errorBody = await response.text();
                console.log(`Login failed - Status: ${response.status()}, Body: ${errorBody}`);
                throw new Error(`Login failed with status ${response.status()}: ${errorBody}`);
            }

            const body = await response.json();
            this.token = body.authorization.startsWith('Bearer') 
                ? body.authorization 
                : 'Bearer ' + body.authorization;
            
            console.log('Token set successfully');
            return body;
            
        } catch (error) {
            console.error('Error in setToken:', error.message);
            this.token = undefined;
            throw error;
        } finally {
            this.isLoggingIn = false;
        }
    }

    
    async ensureValidToken(email = 'ren123@gmail.com', password = '1234567') {
        if (!this.token || this.isLoggingIn) {
            console.log('No valid token found, logging in...');
            await this.setToken(email, password);
        }
        
        
        try {
            const testResponse = await this.request.get(this.baseApi + '/usuarios', {
                headers: { Authorization: this.token }
            });
            
            if (!testResponse.ok()) {
                console.log('Token invalid, refreshing...');
                this.token = undefined;
                await this.setToken(email, password);
            }
        } catch (error) {
            console.log('Token validation failed, refreshing...');
            this.token = undefined;
            await this.setToken(email, password);
        }
    }

    // ===== USER ENDPOINTS =====
    async createUser(user) {
        const uniqueUser = {
            ...user,
            email: `test_${Date.now()}_${Math.random().toString(36).substring(7)}@${user.email.split('@')[1]}`
        };

        const response = await this.request.post(this.baseApi + '/usuarios', {
            headers: { 'Content-Type': 'application/json' },
            data: {
                nome: uniqueUser.nome,
                email: uniqueUser.email,
                password: uniqueUser.password,
                administrador: uniqueUser.administrador ? 'true' : 'false'
            }
        });

        return { response, user: uniqueUser };
    }

    async getAllUsers() {
        await this.ensureValidToken();
        
        const response = await this.request.get(this.baseApi + '/usuarios', {
            headers: { Authorization: this.token }
        });
        
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        return body.usuarios;
    }

    async getUserById(id) {
        await this.ensureValidToken();
        
        const response = await this.request.get(this.baseApi + `/usuarios/${id}`, {
            headers: { Authorization: this.token }
        });
        
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async deleteUser(id) {
        await this.ensureValidToken();
        
        const response = await this.request.delete(this.baseApi + `/usuarios/${id}`, {
            headers: { Authorization: this.token }
        });
        
        return response;
    }

    // ===== PRODUCT ENDPOINTS =====
    async createProduct(product) {
        await this.ensureValidToken();
        
        if (!this.token) {
            throw new Error('No authentication token available');
        }

        const response = await this.request.post(this.baseApi + '/produtos', {
            headers: {
                'Authorization': this.token,
                'Content-Type': 'application/json'
            },
            data: product
        });

        if (!response.ok()) {
            const errorBody = await response.text();
            console.log(`Create product failed - Status: ${response.status()}, Body: ${errorBody}`);
            console.log('Token used:', this.token);
        }

        return response;
    }

    async getAllProducts() {
        const response = await this.request.get(this.baseApi + '/produtos');
        
        expect(response.ok()).toBeTruthy();
        const body = await response.json();
        return body.produtos;
    }

    async getProductById(id) {
        const response = await this.request.get(this.baseApi + `/produtos/${id}`);
        
        expect(response.ok()).toBeTruthy();
        return await response.json();
    }

    async deleteProduct(id) {
        await this.ensureValidToken();
        
        const response = await this.request.delete(this.baseApi + `/produtos/${id}`, {
            headers: { Authorization: this.token }
        });
        
        return response;
    }

    // ===== LOGIN ENDPOINT =====
    async login(email, password) {
        const response = await this.request.post(this.baseApi + '/login', {
            data: { email, password }
        });

        return response;
    }

    
    getToken() {
        return this.token;
    }

    
    clearToken() {
        this.token = undefined;
    }

    
    isAuthenticated() {
        return !!this.token;
    }
}