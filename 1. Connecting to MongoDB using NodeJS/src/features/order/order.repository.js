export default class OerderRepository {
  constructor() {
    this.collection = 'orders';
  }
  async placeOrder(userID) {
    // 1.Get cartItems and calculate total amount
    // 2.Create an order record.
    // 3.Reduce the stock.
    // 4.Clear the cart items
  }
}
