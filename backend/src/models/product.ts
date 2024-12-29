import mongoose, {Schema, Document} from "mongoose";
export interface IProduct extends Document{
  name: string;
  price: number;
  description: string;
  imageUri: string;
  available: boolean;
}

export class ProductRequest {
  product: string | undefined
  quantity: number | undefined;
}
export const productSchema = new Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  description: {type: String, required: true},
  imageUri: {type: String, required: false},
  available: {type: Boolean, required: true}
});

const Product = mongoose.model<IProduct>('Product', productSchema)
export default Product
