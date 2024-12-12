// esto es el archivo app.js

 
import connectionDB from "./database/connectionDB.js";
import bookModel from "./models/bookModel.js";
import bookRouter from './routes/bookRouter.js';
import express from 'express';
import cors from 'cors';
import userModel from "./models/userModel.js";
import authRouter from './routes/authRouter.js';

const port = 8000;
export const app = express();

app.use(express.json());  //middleware, to understand json
app.use(cors()); //middleware to allow requests from any origin

app.use('/books', bookRouter);
app.use('/auth', authRouter);



try {
  await connectionDB.authenticate();
  console.log('Connection has been established successfully.');

  // // Drop the Books table first because it depends on the Users table
  // await bookModel.drop();
  // console.log('The table for books was dropped.');

  // await userModel.drop();
  // console.log('The table for users was dropped.');

  // Recreate the tables
  await userModel.sync(); // Create the Users table
  console.log('The table for the user was created');

  await bookModel.sync(); // Create the Books table
  console.log('The table for the book was created');

  } catch (error) {
    console.error('Fallo fatal y muerte 💀', error);
  }

export const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
