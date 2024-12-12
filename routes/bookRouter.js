import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { checkRole } from '../middleware/roleMiddleware.js';
import { getAllBooks } from "../controllers/bookController.js";
import { createBook } from "../controllers/bookController.js";
import { deleteBook } from "../controllers/bookController.js";
import { updateBook} from "../controllers/bookController.js";


const bookRouter = express.Router();

bookRouter.get('/',  authMiddleware, checkRole(["user", "admin"]),getAllBooks);
bookRouter.post('/', authMiddleware,createBook);
bookRouter.delete('/:id', authMiddleware,checkRole(["admin"]),deleteBook);
bookRouter.put('/:id',authMiddleware,updateBook);




// authRouter.post('/login', login); //login and register

export default bookRouter;