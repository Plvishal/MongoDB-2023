import { ObjectId } from 'mongodb';
import { getDB } from '../../config/mongodb.js';
import { ApplicationError } from '../../error-handler/applicationError.js';

class ProductRepository {
  constructor() {
    this.collection = 'products';
  }
  //   Here start adding new product
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
  //   Here find start all product
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
  //   Here find by id
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
  //   here filter start
  async filter(minPrice, maxPrice, category) {
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      let filterExpression = {};
      if (minPrice) {
        filterExpression.price = { $gte: parseFloat(minPrice) };
      }
      if (maxPrice) {
        filterExpression.price = {
          ...filterExpression.price,
          $lte: parseFloat(maxPrice),
        };
      }
      if (category) {
        filterExpression.category = category;
      }
      return await collection.find(filterExpression).toArray();
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  //   Rating given by the user
  async rate(userID, productID, rating) {
    // console.log( productId);
    try {
      const db = getDB();
      const collection = db.collection(this.collection);
      // 1.find the product
      const product = await collection.findOne({
        _id: new ObjectId(productID),
      });
      // 2. find the rating
      const userRating = product?.ratings?.find((r) => r.userID == userID);
      if (userRating) {
        // 3. update the rating
        await collection.updateOne(
          {
            _id: new ObjectId(productID),
            'ratings.userID': new ObjectId(userID),
          },
          {
            $set: {
              'ratings.$.rating': rating,
            },
          }
        );
      } else {
        await collection.updateOne(
          {
            _id: new ObjectId(productID),
          },
          {
            $push: { ratings: { userID: new ObjectId(userID), rating } },
          }
        );
      }
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }
}

export default ProductRepository;
