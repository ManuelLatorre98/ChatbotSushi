import mongoose from "mongoose";
import {IProductRepository} from "./interfaces/IProductRepository";

export class MongoProductRepository implements IProductRepository{
  private product : mongoose.Model<any>
  constructor(product : mongoose.Model<any>) {
    this.product = product;
  }
  async getAllProducts() {
    return this.product.find();
  }
  async getMenu() {
    return this.product.find({ available: true }).select('name price description imageUri -_id');
  }

}
