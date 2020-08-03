const router = require('express').Router();

const isAuth = require('../middleware/isAuth');
const Product = require('../models/Product');

router.post('/add', isAuth, async (req, res) => {
  const { productId } = req.body;
  try {
    const newProduct = new Product({ productId });
    await newProduct.save();
    res.status(200).json({ msg: 'Product successfully added' });
  } catch (err) {
    res.status(400).json({ succes: false })
  }
});

router.post('/wishlist/:productId', isAuth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  try {
    const product = await Product.findOne({ productId, favUsers: userId });
    if (product) return res.status(400).json({ success: false, msg: 'You already have this product on your wishlist' });
    const updatedProduct = await Product.findOneAndUpdate({ productId }, { $push: { favUsers: userId } }, { new: true }).select('-favUsers');
    res.status(200).json({ success: true, msg: 'Product added to wishlist', product: updatedProduct });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.delete('/wishlist/:productId', isAuth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.body;
  try {
    await Product.updateOne({ productId }, { $pull: { favUsers: userId } });
    res.status(200).json({ success: true, msg: 'Product removed from wishlist' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.get('/wishlist/:productId', isAuth, async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query;
  try {
    const product = await Product.findOne({ productId, favUsers: userId }).select('-favUsers');
    res.status(200).json({ success: true, product });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.get('/wishlist', isAuth, async (req, res) => {
  const { userId } = req.query;
  try {
    const products = await Product.find({ favUsers: userId }).select('-favUsers');
    res.status(200).json({ success: true, products });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;