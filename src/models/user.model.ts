import mongoose, { Schema, model } from 'mongoose';
import { userType } from '../types/user.type';

const userSchema = new Schema<userType>(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    picUrl: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    phoneNo: {
      type: String,
    },
    role: {
      enum: ["user", 'admin'],
      default: 'user',
      required: true,
    },
    // bookings: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Booking',
    //   },
    // ],
  },
  {
    timestamps: true,
  }
);

const userModel = model<userType>('User', userSchema);

export default userModel;
