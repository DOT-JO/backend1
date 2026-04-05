const Order = require('../models/OrderSchema')

const createOrder = async (req, res) => {
  const { cartItems } = req.body;

const totalPrice = cartItems.reduce(
  (acc, item) => acc + item.price * item.quantity,
  0
);

  const order = await Order.create({
    user: req.user.id,
    items: cartItems,
    totalPrice
  });

  res.json(order);
};

module.exports = createOrder