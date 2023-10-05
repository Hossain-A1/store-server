"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productController = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
class productController {
    constructor() { }
    // get all produts
    async getAllProducts(req, res) {
        try {
            const products = await product_model_1.default.find({});
            res.status(200).json(products);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // get a produt
    async getAProduct(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Products not found' });
            }
            const product = await product_model_1.default.findById(id);
            res.status(200).json(product);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // post a produt
    async createAProduct(req, res) {
        try {
            const { title, description, category, images, price } = req.body;
            const product = await product_model_1.default.create({
                title,
                description,
                category,
                images,
                price,
            });
            res.status(200).json(product);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // update a produt
    async updateAProduct(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Products not found' });
            }
            const { title, description, category, images, price } = req.body;
            const product = await product_model_1.default.findByIdAndUpdate(id, {
                title,
                description,
                category,
                images,
                price,
            }, { new: true });
            res.status(200).json(product);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // delete a produt
    async deleteAProduct(req, res) {
        try {
            const { id } = req.params;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Products not found' });
            }
            const product = await product_model_1.default.findByIdAndUpdate(id);
            res.status(200).json(product);
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.productController = productController;
