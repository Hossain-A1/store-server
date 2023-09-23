import { Document } from 'mongoose';
import { orderType } from './order.type';

export type userType = {
  name: string;
  email: string;
  password: string;
  picUrl: string;
  address?: string;
  phoneNo: string;
  order:orderType[],
  role: 'user' | 'admin';
} & Document;
