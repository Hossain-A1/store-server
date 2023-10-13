"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
const user_model_1 = __importDefault(require("../models/user.model"));
const order_model_1 = __importDefault(require("../models/order.model"));
const product_model_1 = __importDefault(require("../models/product.model"));
class orderController {
    constructor() { }
    // create a order
    async createOrder(req, res) {
        var _a;
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Beauty package not found' });
            }
            const user = await user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id).populate('order');
            const alreadyOrdered = user === null || user === void 0 ? void 0 : user.order.find((ele) => id === ele.products._id.toString());
            if (alreadyOrdered) {
                res.status(403).json({ message: 'Product already ordered' });
                return;
            }
            await Promise.resolve().then(async () => {
                var _a, _b;
                const singleOrder = await order_model_1.default.create({
                    products: id,
                    user: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id,
                });
                await product_model_1.default.findByIdAndUpdate(id, {
                    $addToSet: {
                        order: singleOrder._id,
                    },
                });
                await user_model_1.default.findByIdAndUpdate((_b = req.user) === null || _b === void 0 ? void 0 : _b._id, {
                    $addToSet: {
                        order: singleOrder._id,
                    },
                });
                res.status(200).json(singleOrder);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    //delete a order
    async deleteAnOrder(req, res) {
        var _a;
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Beauty package not found' });
            }
            const existedOrder = await order_model_1.default.findById(id);
            if (!existedOrder) {
                res.status(403).json({ message: "Order doesn't exist" });
                return;
            }
            const user = await user_model_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a._id);
            const matchedOrder = user === null || user === void 0 ? void 0 : user.order.find((ord) => id === ord._id.toString());
            if (!matchedOrder) {
                res.status(403).json({ message: "Booking doesn't exist" });
                return;
            }
            await Promise.resolve().then(async () => {
                const singleOrder = await order_model_1.default.findByIdAndDelete(id);
                res.status(200).json(singleOrder);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // get all order
    async getAllOrder(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const orders = await order_model_1.default.find({}).populate('products user');
                res.status(200).json(orders);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = orderController;
