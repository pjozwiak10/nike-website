const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { v4: uuidv4 } = require('uuid');

const isAuth = require('../middleware/isAuth');
const Order = require('../models/Order');
const Product = require('../models/Product');

const createOrderNumber = () => {
  return [...new Date().toISOString().split('T')[0].split('-').reverse().map((el, i, arr) => i === arr.length - 1 ? el.slice(-2) : el),
  Math.floor(100000 + Math.random() * 900000)].join('');
}

router.post('/', isAuth, async (req, res) => {
  const { userId, total, email, products, shipping, token } = req.body;
  const { address, city, zipCode, country, phone } = shipping;
  if (!address || !city || !zipCode || !country || !phone) res.status(400).json({ msg: 'Please complete the shipping details', success: false });
  const idempotencyKey = uuidv4();
  try {
    const customer = await stripe.customers.create({ email: token.email, source: token.id, });
    const charge = await stripe.charges.create({
      amount: Math.round(total * 100),
      currency: 'PLN',
      customer: customer.id,
      receipt_email: token.email,
      description: `Purchase of ${products.map(product => product.name).join(',')}`,
    }, { idempotencyKey });
    const orderNumber = createOrderNumber();
    const orderProducts = await Promise.all(products.map(async product => {
      const searchedProduct = await Product.findOne({ productId: product.id }, { _id: 1, productId: 1 });
      return { size: product.size, quantity: product.quantity, productId: searchedProduct.productId, product: searchedProduct._id };
    }));
    const newOrder = new Order({
      orderNumber,
      total,
      user: userId,
      email,
      products: orderProducts,
      shipping: { address, city, zipCode, country, phone }
    });
    const order = await newOrder.save();
    res.status(200).json({ success: true, msg: "Payment accepted", order, charge })
  } catch (err) {
    res.status(400).json({ msg: 'Something goes wrong', success: false });
  }
});

router.get('/', isAuth, async (req, res) => {
  const { userId } = req.query;
  const orders = await Order.find({ user: userId }, { user: 0, __v: 0, }).sort({ createdAt: -1 });
  res.status(200).json({ success: true, orders });
});

module.exports = router;