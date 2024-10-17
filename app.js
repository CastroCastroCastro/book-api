// esto es el archivo app.js

 
import connectionDB from "./database/connectionDB.js";
import bookModel from "./models/bookModel.js";
import bookRouter from './routes/bookRouter.js';
import express from 'express';
import cors from 'cors';
import userModel from "./models/userModel.js";

const port = 8000;
const app = express();

app.use(express.json());  //middleware, to understand json
app.use(cors()); //middleware to allow requests from any origin

app.use('/books', bookRouter);



try {
    await connectionDB.authenticate();
    console.log('Conexión exitosa ✨');
    await userModel.sync({ force: false }); //change to false when it works
    await bookModel.sync({ force: false }); //change to false when it works
    console.log('La tabla fue creada ✨');
  } catch (error) {
    console.error('Fallo fatal y muerte 💀', error);
  }
export const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

export { app };