import express, { Router } from 'express';

const orderRouter: Router = express.Router();

// create a order
orderRouter.post('/create');
// get all order
orderRouter.get('/');
// get all order for an user
orderRouter.get('/read');
// delete a order
orderRouter.post('/:id');

export default orderRouter;
