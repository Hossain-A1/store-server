"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const checkoutController_1 = require("../controllers/checkoutController");
const checkoutInstance = new checkoutController_1.stripeCheckoutController();
const checkoutRouter = express_1.default.Router();
// checkout
checkoutRouter.post('/create-checkout-session ', checkoutInstance.createCheckoutSession);
exports.default = checkoutRouter;
