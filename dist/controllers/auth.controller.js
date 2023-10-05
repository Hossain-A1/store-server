"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../models/user.model"));
const auth_token_manager_1 = __importDefault(require("../manager/auth.token.manager"));
const handle_error_1 = require("../errors/handle.error");
const authTokenInstance = new auth_token_manager_1.default();
class AuthController {
    constructor() { }
    async register(req, res) {
        try {
            const { name, email, password, picUrl, address, phoneNo } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.register(name, email, password, picUrl, address, phoneNo);
                const token = authTokenInstance.createToken(user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
    async login(req, res) {
        try {
            const { email, password } = req.body;
            await Promise.resolve().then(async () => {
                const user = await user_model_1.default.login(email, password);
                const token = authTokenInstance.createToken(user._id);
                res.status(200).json({ user, token });
            });
        }
        catch (error) {
            await (0, handle_error_1.handleError)(error, res);
        }
    }
}
exports.default = AuthController;
