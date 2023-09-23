import { Document } from "mongoose"
import { productType } from "./product.type"
import { userType } from "./user.type"

export type orderType = {
  products:productType,
  user:userType
} & Document