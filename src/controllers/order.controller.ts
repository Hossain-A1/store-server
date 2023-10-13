import { Request, Response } from 'express';
import { handleError } from '../errors/handle.error';
import { orderType } from '../types/order.type';
import mongoose from 'mongoose';
import userModel from '../models/user.model';
import orderModel from '../models/order.model';
import productModel from '../models/product.model';

export default class orderController {
  constructor() {}

  // create a order

  public async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Beauty package not found' });
      }
      const user = await userModel.findById(req.user?._id).populate('order');

      const alreadyOrdered = user?.order.find(
        (ele: orderType) => id === ele.products._id.toString()
      );

      if (alreadyOrdered) {
        res.status(403).json({ message: 'Product already ordered' });
        return;
      }

      await Promise.resolve().then(async () => {
        const singleOrder = await orderModel.create({
          products: id,
          user: req.user?._id,
        });

        await productModel.findByIdAndUpdate(id, {
          $addToSet: {
            order: singleOrder._id,
          },
        });

        await userModel.findByIdAndUpdate(req.user?._id, {
          $addToSet: {
            order: singleOrder._id,
          },
        });
        res.status(200).json(singleOrder);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  //delete a order

  public async deleteAnOrder(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Beauty package not found' });
      }

      const existedOrder = await orderModel.findById(id);

      if (!existedOrder) {
        res.status(403).json({ message: "Order doesn't exist" });
        return;
      }

      const user = await userModel.findById(req.user?._id);

      const matchedOrder = user?.order.find(
        (ord: orderType) => id === ord._id.toString()
      );

      if (!matchedOrder) {
        res.status(403).json({ message: "Booking doesn't exist" });
        return;
      }

      await Promise.resolve().then(async () => {
        const singleOrder = await orderModel.findByIdAndDelete(id);
        res.status(200).json(singleOrder);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // get all order

  public async getAllOrder(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const orders = await orderModel.find({}).populate('products user');

        res.status(200).json(orders);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }
}
