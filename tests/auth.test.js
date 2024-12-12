import request from 'supertest';
import { app, server } from '../app.js';
import connectionDB from '../database/connectionDB.js';
import bookModel from '../models/bookModel.js';

//test login and register and whether the token and user data is returned
describe('Login and Register', () => {
    test('Should return a response with status 200 and type JSON', async () => {
        const response = await request(app).get('/auth');
        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

    test('Should register a new user and return a token', async () => {
        const newUser = {
            username: 'testuser',
            password: 'testpassword',
        };
        const response = await request(app)
            .post('/auth/register')
            .send(newUser);
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
    });

    test('Should login an existing user and return a token', async () => {
        const user = {
            username: 'testuser',
            password: 'testpassword'
        };
        const response = await request(app)
            .post('/auth/login')
            .send(user);
        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('token');
        expect(response.body).toHaveProperty('user');
    });

    test('Should fail to register a user with an existing username', async () => {
        const existingUser = {
            username: 'testuser',
            password: 'testpassword'
        };
        const response = await request(app)
            .post('/auth/register')
            .send(existingUser);
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('Should fail to login with incorrect credentials', async () => {
        const invalidUser = {
            username: 'testuser',
            password: 'wrongpassword'
        };
        const response = await request(app)
            .post('/auth/login')
            .send(invalidUser);
        expect(response.status).toBe(401);
        expect(response.body).toHaveProperty('error');
    });
});
    