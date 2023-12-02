import { getDB } from '../../config/mongodb.js';
import { ApplicationError } from '../../error-handler/applicationError.js';
export default class UserModel {
  constructor(name, email, password, type, id) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.type = type;
    this._id = id;
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
