import { getDB } from '../../config/mongodb.js';
import { ApplicationError } from '../../error-handler/applicationError.js';
class UserRepository {
  async signUp(newUser) {
    try {
      // 1. Get the datbase
      const db = getDB();
      // 2.Get the collection
      const collection = db.collection('users');
      //   3. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong,500');
    }
  }
  //   User SignIn
  async signIn(email, password) {
    try {
      // 1. Get the datbase
      const db = getDB();
      // 2.Get the collection
      const collection = db.collection('users');
      //   3. Find the document
     return  await collection.findOne({ email, password });

    } catch (error) {
      console.log(error);
      throw new ApplicationError('Something went wrong,500');
    }
  }
}

export default UserRepository;
