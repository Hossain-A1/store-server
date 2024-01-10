import { Document } from 'mongoose';

export type productType = {
  title: string;
  description: string;
  category: string;
  images: string[];
  price: number;
  order: string[];
  rating: number;
  count: number;
} & Document;
