import request from 'supertest';
import { app, server } from '../app.js';
import connectionDB from '../database/connectionDB.js'; 
import userModel from '../models/userModel.js';
import bookModel from '../models/bookModel.js';
import { encrypt } from '../utils/handlePassword.js';
import { header } from 'express-validator';
import { tokenSign } from '../utils/handleJWT.js';

//change to ask for token and check for id after token

let token;

beforeAll(async () => {
    await connectionDB.authenticate();
    await connectionDB.sync({ force: true });

    // const password = 'testpassword';
    const hashedPassword = await encrypt('testpassword');
    console.log(hashedPassword);
    // const testUser = {
    //     name: 'testuser',
    //     email: 'test@email.com',
    //     password: hashedPassword
    // }
    // console.log(testUser);
    const newUserTest = await userModel.create({
        name: 'testuser',
        email: 'test@email.com',
        password: hashedPassword
    });

    token = await tokenSign(newUserTest);
    
}); 

//test with postman,use a get request give it a token and see if it responds
describe('CRUD books', () => {
    test('Should return a response with status 200 and type JSON', async () => {

        console.log(token);
        const response = await request(app)
            .get('/books')
            .set('Authorization', `Bearer ${token}`);


        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toContain('application/json');
    });

//     test('Should create a book', async () => {
//         const bookData = {
//             title : 'Test Book',
//             author: "Test Author",
//             description: "Test Description"
//         }
//     const response = await request(app)
//         .post('/books')
//         .send(bookData);
//     expect(response.status).toBe(201);
// });

// test('Should return a response with status 201 and type JSON', async () => {
//     const bookData = {
//         title: 'Test Book',
//         author: 'Test Author',
//         description: 'Test Description'
//     };
//     const response = await request(app)
//         .post('/books')
//         .send(bookData);
//     expect(response.status).toBe(201);
// });

// test('should delete a book', async () => {
//     const book = await bookModel.create({
//       title: 'Test title',
//       author: 'Test Author',
//       description: 'This is a delete test'
//     });

//     const response = await request(app).delete(/books/${book.id});

//     expect(response.statusCode).toBe(200);
//     expect(response.body.message).toBe('Libro eliminado correctamente');
//   })

// });

// test('Should update a Book', async () => {
//     const book = await bookModel.create ({
//         title: 'Test title',
//         author: 'Test author',
//         description: 'This is an update test'
//     });

//     const response = await request(app).put(/books/${book.id});

//     expect(response.statusCode).toBe(200);
//     expect(response.body.message).toBe('Book updated correctly')
    

});

afterAll(async () => {
    await connectionDB.close(); // Ensure DB connection is fully closed
    server.close();
});