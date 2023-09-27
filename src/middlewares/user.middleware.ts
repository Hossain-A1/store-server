import { NextFunction, Request, Response } from 'express';
import { userType } from '../types/user.type';
import JWTTokenManager from '../manager/auth.token.manager';
import UserModel from '../models/user.model';

const jwtInstance = new JWTTokenManager();

interface jwtIdPayload {
  id: string;
}

declare module 'express' {
  interface Request {
    user?: userType;
  }
}

export default class userMiddleware {
  constructor() {}

  public async isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }

    try {
      const payload = jwtInstance.verifyToken(token) as jwtIdPayload;
      const user = await UserModel.findById(payload.id);
      if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
      req.user = user;
      next();
    } catch (error) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  }

  public async isAdmin(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const user = req.user;
    if (user && user.role === 'admin') {
      next();
    } else {
      res.status(403).json({ message: 'Forbidden' });
      return;
    }
  }
}
