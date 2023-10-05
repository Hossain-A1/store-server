"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_mongo_sanitize_1 = __importDefault(require("express-mongo-sanitize"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = require("body-parser");
const hpp_1 = __importDefault(require("hpp"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const product_route_1 = __importDefault(require("./routes/product.route"));
const order_route_1 = __importDefault(require("./routes/order.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.configerMiddlewares();
        this.setUpRoutes();
        this.connectToTheDatabase();
    }
    configerMiddlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)());
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use((0, express_mongo_sanitize_1.default)());
        this.app.use((0, hpp_1.default)());
        this.app.use((0, helmet_1.default)());
    }
    setUpRoutes() {
        this.app.get('/', (req, res) => {
            return res.status(200).json({ message: 'Welcome to noreStore-server😊' });
        });
        // bypass Routes
        this.app.use('/api/auth', auth_route_1.default);
        this.app.use('/api/users', user_route_1.default);
        this.app.use('/api/products', product_route_1.default);
        this.app.use('/api/orders', order_route_1.default);
    }
    connectToTheDatabase() {
        const uri = process.env.MONGO_URI;
        mongoose_1.default
            .connect(uri)
            .then(() => {
            const port = process.env.PORT || 4000;
            this.app.listen(port, () => {
                console.log(`Server listen on port : ${port} and DB connected.`);
            });
        })
            .catch((error) => {
            console.log(`DB error is => ${error}`);
        });
    }
}
dotenv_1.default.config();
new App();
