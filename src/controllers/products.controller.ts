import { Request, Response } from 'express';
import productModel from '../models/product.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';

export class productController {
  constructor() {}
  // get all produts
  public async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const products = await productModel.find({});
        res.status(200).json(products);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }
  // get a produt
  public async getAProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Products not found' });
      }
      await Promise.resolve().then(async () => {
        const product = await productModel.findById(id);
        res.status(200).json(product);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // create a produt
  public async createAProduct(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const { title, description, category, images, price, rating } =
          req.body;

        const product = await productModel.create({
          title,
          description,
          category,
          images,
          price,
          rating,
        });
        res.status(200).json(product);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // update a produt
  public async updateAProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Products not found' });
      }
      await Promise.resolve().then(async () => {
        const { title, description, category, images, price } = req.body;

        const product = await productModel.findByIdAndUpdate(
          id,
          {
            title,
            description,
            category,
            images,
            price,
          },
          { new: true }
        );
        res.status(200).json(product);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // delete a produt
  public async deleteAProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Products not found' });
      }

      await Promise.resolve().then(async () => {
        const product = await productModel.findByIdAndDelete(id);
        res.status(200).json(product);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }
}
