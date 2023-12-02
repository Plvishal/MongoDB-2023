import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';
import { ApplicationError } from '../../error-handler/applicationError.js';

class ProductRepository {
  constructor() {
    this.collection = 'products';
  }
  async add(newProduct) {
    try {
      // Get the db
      const db = getDB();
      //   Get the collection
      const collection = db.collection(this.collection);
      await collection.insertOne(newProduct);
      return newProduct;
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong with the database', 500);
    }
  }
  async getAll() {
    try {
      // 1. get the db
      const db = getDB();
      //   2. get the colllection
      const collection = db.collection(this.collection);
      return await collection.find().toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong with the database', 500);
    }
  }
  async get(id) {
    try {
      // 1. get the db
      const db = getDB();
      //   2. get the colllection
      const collection = db.collection(this.collection);
      return await collection.findOne({ _id: new ObjectId(id) });
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong with the database', 500);
    }
  }
}

export default ProductRepository;
