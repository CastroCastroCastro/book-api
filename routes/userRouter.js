//only an admin can use this route
import express from 'express';
import { registerController, loginController } from '../controllers/authController';
import userController from '../controllers/userController';
import { authMiddleware } from '../middleware/authMiddleware';
import { checkRole } from '../middleware/roleMiddleware';

const userRouter = express.Router();

userRouter.post('/register', registerController);
userRouter.post('/login', loginController);

userRouter.get('/', authMiddleware, checkRole(["admin"]), userController.getAllUsers);
userRouter.get('/:id', authMiddleware, checkRole(["admin"]), userController.getUser);
userRouter.put('/:id', authMiddleware, checkRole(["admin"]), userController.updateUser);
userRouter.delete('/:id', authMiddleware, checkRole(["admin"]), userController.deleteUser);

export default userRouter;