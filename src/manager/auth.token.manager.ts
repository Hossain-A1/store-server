import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export default class JWTTokenManager {
  private readonly secret: string;
  private readonly expireIn: string;

  constructor() {
    this.secret = process.env.JWT_SECRET as string;
    this.expireIn = '7d';
  }

  public createToken(id: string): string {
    try {
      const token = jwt.sign({ id }, this.secret, { expiresIn: this.expireIn });
      return token;
    } catch (error) {
      throw new Error('Token creation faild');
    }
  }

  public verifyToken(token: string): JwtPayload | string | object {
    try {
      const payload = jwt.verify(token, this.secret);
      return payload;
    } catch (error) {
      throw new Error('Token verification faild');
    }
  }
}
