import express, { Router } from 'express';
import { productController } from '../controllers/products.controller';
import userMiddleware from '../middlewares/user.middleware';

const productsInstance = new productController();
const authInstance = new userMiddleware();
const productRouter: Router = express.Router();

// get all products
productRouter.get('/', productsInstance.getAllProducts);
// get a prduct
productRouter.get('/:id', productsInstance.getAProduct);
// post a prduct
productRouter.post(
  '/',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  productsInstance.createAProduct
);
// update a prduct
productRouter.put(
  '/:id',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  productsInstance.updateAProduct
);
// delete a prduct
productRouter.delete(
  '/:id',
  authInstance.isAuthenticated,
  authInstance.isAdmin,
  productsInstance.deleteAProduct
);

export default productRouter;
