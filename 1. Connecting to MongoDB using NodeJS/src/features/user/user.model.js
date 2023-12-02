import { getDB } from '../../config/mongodb.js';
import { ApplicationError } from '../../error-handler/applicationError.js';
export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this.id = id;
  }

  static async signUp(name, email, password, type) {
    try {
      // 1. Get the datbase
      const db = getDB();
      // 2.Get the collection
      const collection = db.collection('users');
      // 3.
      const newUser = new UserModel(name, email, password, type);
      // 4. Insert the document
      await collection.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new ApplicationError('Something went wrong,500');
    }
  }

  static signIn(email, password) {
    const user = users.find((u) => u.email == email && u.password == password);
    return user;
  }

  static getAll() {
    return users;
  }
}

var users = [
  {
    id: 1,
    name: 'User 1',
    email: 'sl@ecom.com',
    password: 'sl12',
    type: 'seller',
  },
  {
    id: 2,
    name: 'Customer 1',
    email: 'ct@ecom.com',
    password: 'ct12',
    type: 'Customer',
  },
];
