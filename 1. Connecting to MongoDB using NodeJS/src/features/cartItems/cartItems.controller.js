import { ApplicationError } from '../../error-handler/applicationError.js';
import CartItemModel from './cartItems.model.js';
import CartItemsRepository from './cartIttem.repository.js';

export class CartItemsController {
  constructor() {
    this.cartRepository = new CartItemsRepository();
  }
  async add(req, res) {
    try {
      const { productID, quantity } = req.body;
      const userID = req.userID;
      await this.cartRepository.add(productID, userID, quantity);
      res.status(201).send('Cart is updated');
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  async get(req, res) {
    try {
      const userID = req.userID;
      const items = await this.cartRepository.get(userID);
      return res.status(200).send(items);
    } catch (err) {
      console.log(err);
      throw new ApplicationError('Something went wrong with database', 500);
    }
  }

  async delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.params.id;
    const isDeleted = await this.cartRepository.delete(userID, cartItemID);
    if (!isDeleted) {
      return res.status(404).send('Items not found');
    }
    return res.status(200).send('Cart item is removed');
  }
}
