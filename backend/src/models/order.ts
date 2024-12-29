import Product, {IProduct} from "./product";
import mongoose, {Schema} from "mongoose";
import {Entities} from "../services/interfaces/IServiceAI";

type Status = 'pending' | 'delivered' | 'canceled';

export interface IOrder extends Document{
  userOrderReq: Entities[];
  status: Status;
  clientName: string;
}
export const orderSchema = new Schema({
  userOrderReq: [{
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true }
  }],
  status: {
    type: String,
    required: true,
    enum: ['pending', 'delivered', 'canceled']
  },
  clientName: { type: String, required: true }
});


const Order = mongoose.model<IOrder>('Order', orderSchema)

export default Order

