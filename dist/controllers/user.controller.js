"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const handle_error_1 = require("../errors/handle.error");
const mongoose_1 = __importDefault(require("mongoose"));
class userController {
    constructor() { }
    // get an user
    async getAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Unauthorized user' });
                return;
            }
            if (id !== userId.toString()) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findById(id).populate('order');
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // delete an user
    async deleteAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Unauthorized user' });
            }
            if (id !== userId.toString()) {
                res.status(403).json({ message: 'Forbidden' });
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndDelete(id);
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // update an user
    async updateAnUser(req, res) {
        var _a;
        try {
            const { id } = req.params;
            const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
            const { name, picUrl, address, phoneNo } = req.body;
            if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
                res.status(404).json({ message: 'Unauthorized user' });
                return;
            }
            if (id !== userId.toString()) {
                res.status(403).json({ message: 'Forbidden' });
                return;
            }
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.findByIdAndUpdate(id, { name, picUrl, address, phoneNo }, { new: true });
                res.status(200).json(user);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    // get all user
    async getAllUser(req, res) {
        try {
            await Promise.resolve().then(async () => {
                const users = await user_model_1.default.find({});
                res.status(200).json(users);
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = userController;
