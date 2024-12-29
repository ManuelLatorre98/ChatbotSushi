import * as mongoose from "mongoose";

export const mongodbInit = async (): Promise<void> => {
  try {
    await mongoose.connect(process.env.DB_CONN_STRING!,{dbName: process.env.DB_NAME!});
  } catch (err) {
    console.error('Error connecting to MongoDB:', err)
  }
}
