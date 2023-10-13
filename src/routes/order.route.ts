import express, { Router } from 'express';
import userMiddleware from '../middlewares/user.middleware';
import orderController from '../controllers/order.controller';

const orderRouter: Router = express.Router();
const authInstance = new userMiddleware()
const orderInstance = new orderController()

// create a order
orderRouter.post('/create/:id',authInstance.isAuthenticated,orderInstance.createOrder);

// delete a order
orderRouter.delete('/:id',authInstance.isAuthenticated,orderInstance.deleteAnOrder);

// get all order
orderRouter.get('/',authInstance.isAuthenticated,authInstance.isAdmin
,orderInstance.getAllOrder);
export default orderRouter;
