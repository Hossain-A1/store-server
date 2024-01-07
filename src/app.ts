import express, { Application, Request, Response } from 'express';
import mongoSanitize from 'express-mongo-sanitize';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import { urlencoded } from 'body-parser';
import hpp from 'hpp';
import helmet from 'helmet';
import morgan from 'morgan';
import userRouter from './routes/user.route';
import productRouter from './routes/product.route';
import orderRouter from './routes/order.route';
import authRouter from './routes/auth.route';
import checkoutRouter from './routes/checkout.route';
class App {
  private app: Application;

  constructor() {
    this.app = express();
    this.configerMiddlewares();
    this.setUpRoutes();
    this.connectToTheDatabase();
  }

  private configerMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(morgan('dev'));
    this.app.use(cors());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(mongoSanitize());
    this.app.use(hpp());
    this.app.use(helmet());
  }

  private setUpRoutes(): void {
    this.app.get('/', (req: Request, res: Response) => {
      return res.status(200).json({ message: 'Welcome to noreStore-server😊' });
    });
    // bypass Routes
    this.app.use('/api/auth', authRouter);
    this.app.use('/api/users', userRouter);
    this.app.use('/api/products', productRouter);
    this.app.use('/api/orders', orderRouter);
    this.app.use('/api', checkoutRouter);
  }
  private connectToTheDatabase(): void {
    const uri = process.env.MONGO_URI as string;
    mongoose
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

dotenv.config();
new App();
