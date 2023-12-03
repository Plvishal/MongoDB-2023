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

  get(req, res) {
    const userID = req.userID;
    const items = CartItemModel.get(userID);
    return res.status(200).send(items);
  }

  delete(req, res) {
    const userID = req.userID;
    const cartItemID = req.params.id;
    const error = CartItemModel.delete(cartItemID, userID);
    if (error) {
      return res.status(404).send(error);
    }
    return res.status(200).send('Cart item is removed');
  }
}
