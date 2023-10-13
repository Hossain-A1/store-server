"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const orderRouter = express_1.default.Router();
const authInstance = new user_middleware_1.default();
const orderInstance = new order_controller_1.default();
// create a order
orderRouter.post('/create/:id', authInstance.isAuthenticated, orderInstance.createOrder);
// delete a order
orderRouter.delete('/:id', authInstance.isAuthenticated, orderInstance.deleteAnOrder);
// get all order
orderRouter.get('/', authInstance.isAuthenticated, authInstance.isAdmin, orderInstance.getAllOrder);
exports.default = orderRouter;
