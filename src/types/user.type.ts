import { Document } from "mongoose";

export type userType = {
  name: string;
  email: string;
  password: string;
  picUrl: string;
  address?: string;
  phoneNo: string;
  role:"user" | "admin"
} & Document;
