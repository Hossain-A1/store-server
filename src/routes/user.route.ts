import express, { Router } from 'express';
import userController from '../controllers/user.controller';
import userMiddleware from '../middlewares/user.middleware';

const userRouter: Router = express.Router();
const middleWareInstance = new userMiddleware();
const userInstance = new userController();

// get an user
userRouter.get(
  '/:id',
  middleWareInstance.isAuthenticated,
  userInstance.getAnUser
);
// delete an user
userRouter.delete(
  '/:id',
  middleWareInstance.isAuthenticated,
  userInstance.deleteAnUser
);
// update an user
userRouter.put(
  '/:id',
  middleWareInstance.isAuthenticated,
  userInstance.updateAnUser
);
// get all users
userRouter.get(
  '/',
  middleWareInstance.isAuthenticated,
  middleWareInstance.isAdmin,
  userInstance.getAllUser
);

export default userRouter;
