"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = require("../controllers/products.controller");
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const productsInstance = new products_controller_1.productController();
const authInstance = new user_middleware_1.default();
const productRouter = express_1.default.Router();
// get all products
productRouter.get('/', productsInstance.getAllProducts);
// get a prduct
productRouter.get('/:id', productsInstance.getAProduct);
// post a prduct
productRouter.post('/', authInstance.isAuthenticated, authInstance.isAdmin, productsInstance.createAProduct);
// update a prduct
productRouter.put('/:id', authInstance.isAuthenticated, authInstance.isAdmin, productsInstance.updateAProduct);
// delete a prduct
productRouter.delete('/:id', authInstance.isAuthenticated, authInstance.isAdmin, productsInstance.deleteAProduct);
exports.default = productRouter;
