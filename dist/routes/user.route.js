"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = __importDefault(require("../controllers/user.controller"));
const user_middleware_1 = __importDefault(require("../middlewares/user.middleware"));
const userRouter = express_1.default.Router();
const middleWareInstance = new user_middleware_1.default();
const userInstance = new user_controller_1.default();
// get an user
userRouter.get('/:id', middleWareInstance.isAuthenticated, userInstance.getAnUser);
// delete an user
userRouter.delete('/:id', middleWareInstance.isAuthenticated, userInstance.deleteAnUser);
// update an user
userRouter.put('/:id', middleWareInstance.isAuthenticated, userInstance.updateAnUser);
// get all users
userRouter.get('/', middleWareInstance.isAuthenticated, middleWareInstance.isAdmin, userInstance.getAllUser);
exports.default = userRouter;
