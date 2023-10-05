"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderRouter = express_1.default.Router();
// create a order
orderRouter.post('/create');
// get all order
orderRouter.get('/');
// get all order for an user
orderRouter.get('/read');
// delete a order
orderRouter.post('/:id');
exports.default = orderRouter;
