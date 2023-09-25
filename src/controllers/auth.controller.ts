import { Request, Response } from 'express';
import userModel from '../models/user.model';
import JWTTokenManager from '../manager/auth.token.manager';
import { handleError } from '../errors/handle.error';

const authTokenInstance = new JWTTokenManager();

export default class AuthController {
  constructor() {}

  public async register(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, password, picUrl, address, phoneNo } = req.body;

      await Promise.resolve().then(async () => {
        const user = await userModel.register(
          name,
          email,
          password,
          picUrl,
          address,
          phoneNo
        );

        const token = authTokenInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error: unknown) {
      await handleError(error, res);
    }
  }

  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      await Promise.resolve().then(async () => {
        const user = await userModel.login(email, password);

        const token = authTokenInstance.createToken(user._id);

        res.status(200).json({ user, token });
      });
    } catch (error) {
      await handleError(error, res);
    }
  }
}
