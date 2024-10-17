import express from 'express';
import { getAllBooks } from "../controllers/bookController.js";
import { createBook } from "../controllers/bookController.js";
import { deleteBook } from "../controllers/bookController.js";
import { updateBook} from "../controllers/bookController.js";


const bookRouter = express.Router();

bookRouter.get('/', getAllBooks);
bookRouter.post('/', createBook);
bookRouter.delete('/:id', deleteBook);
bookRouter.put('/:id', updateBook);




// authRouter.post('/login', login); //login and register

export default bookRouter;