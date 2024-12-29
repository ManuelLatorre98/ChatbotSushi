import * as mongoose from 'mongoose';
import Product from "../models/product";

import * as dotenv from "dotenv";
import {mongodbInit} from "../config/mongodbInit";

const productos = [
  {
    name: "Maki Roll",
    price: 100,
    description: "Efectivamente, es un maki roll",
    imageUri: "unurl",
    available: true
  },
  {
    name: "Uramaki",
    price: 200,
    description: "Descripcion uramaki",
    imageUri: "unurl",
    available: true
  },
  {
    name: "California Roll",
    price: 50,
    description: "descripcion california roll",
    imageUri: "unurl",
    available: true
  },
  {
    name: "Frushi",
    price: 50,
    description: "descripcion frushi",
    imageUri: "unurl",
    available: false
  }
];

export async function seedDB() {
  try {
    dotenv.config();

    await mongodbInit()

    await Product.deleteMany({})

    await Product.insertMany(productos)
    console.log('Products inserted successfully')

    await mongoose.disconnect()
    console.log('Disconnected from MongoDB')
  } catch (error) {
    console.error('Error running seed', error)
  }
}
seedDB().then(r => console.log('Seed finished')).catch(e => console.error('Error running seed', e))
