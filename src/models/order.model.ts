import mongoose, { Schema, model } from 'mongoose';
import { orderType } from '../types/order.type';

const orderSchema = new Schema<orderType>(
  {
    products: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },

  {
    timestamps: true,
  }
);

const orderModel = model<orderType>('Order', orderSchema);

export default orderModel;
