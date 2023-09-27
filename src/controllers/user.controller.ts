import { Response, Request } from 'express';
import userModel from '../models/user.model';
import { handleError } from '../errors/handle.error';
import mongoose from 'mongoose';

export default class userController {
  constructor() {}
  // get an user
  public async getAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Unauthorized user' });
        return;
      }

      if (id !== userId.toString()) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findById(id);
        res.status(200).json(user);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  // delete an user
  public async deleteAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?._id;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Unauthorized user' });
      }

      if (id !== userId) {
        res.status(403).json({ message: 'Forbidden' });
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findByIdAndDelete(id);
        res.status(200).json(user);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // update an user
  public async updateAnUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.user?._id;
      const { name, picUrl, address, phoneNo } = req.body;

      if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: 'Unauthorized user' });
        return;
      }

      if (id !== userId) {
        res.status(403).json({ message: 'Forbidden' });
        return;
      }

      await Promise.resolve().then(async () => {
        const user = await userModel.findByIdAndUpdate(
          id,
          { name, picUrl, address, phoneNo },
          { new: true }
        );
        res.status(200).json(user);
      });
    } catch (error) {
      await handleError(error, res);
    }
  }

  // get all user
  public async getAllUser(req: Request, res: Response): Promise<void> {
    try {
      await Promise.resolve().then(async () => {
        const users = await userModel.find({});
        res.status(200).json(users);
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }
}
