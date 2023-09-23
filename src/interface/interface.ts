import { Model } from 'mongoose';

import { userType } from '../types/user.type';

export interface userModelInterface extends Model<userType> {
  register(
    name: string,
    email: string,
    password: string,
    picUrl: string,
    address?: string,
    phoneNo?: string
  ): Promise<userType>;

  login(email: string, password: string): Promise<userType>;
}
