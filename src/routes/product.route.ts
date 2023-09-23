import express, { Router } from 'express';

const productRouter: Router = express.Router();

// get all products
productRouter.get('/');
// get a prduct
productRouter.get('/:id');
// post a prduct
productRouter.post('/');
// update a prduct
productRouter.put('/:id');
// delete a prduct
productRouter.delete('/:id');

export default productRouter;
