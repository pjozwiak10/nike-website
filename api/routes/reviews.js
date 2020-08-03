const router = require('express').Router();

const isAuth = require('../middleware/isAuth');
const Review = require('../models/Review');
const Product = require('../models/Product');

router.post('/:productId', isAuth, async (req, res) => {
  const { productId } = req.params;
  const { name, userId, rate, content } = req.body;
  if (!rate || !content) return res.status(400).json({ msg: 'Please enter all fields' });
  try {
    const product = await Product.findOne({ productId }).select('productId _id');
    if (!product) return res.status(400).json({ msg: 'Product not found' });
    const existingReview = await Review.findOne({ user: userId, product: product._id });
    if (existingReview) return res.status(400).json({ success: false, msg: 'You have already added an opinion to this product' });
    const newReview = new Review({ rate, content, author: name, user: userId, productId, product: product._id });
    const review = await newReview.save();
    res.status(200).json({ success: true, msg: 'Review successfully added', review })
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.get('/:productId', async (req, res) => {
  const { productId } = req.params;
  const { userId } = req.query;
  try {
    const product = await Product.findOne({ productId }).select('productId _id');
    const userReview = await Review.findOne({ user: userId, product: product._id }) ? true : false;
    const reviews = await Review.find({ product: product._id }, { product: 0, user: 0 });
    res.status(200).json({ success: true, reviews, userReview });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.get('/', isAuth, async (req, res) => {
  const { userId } = req.query;
  try {
    const reviews = await Review.find({ user: userId }, { user: 0, }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, reviews });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

router.patch('/', isAuth, async (req, res) => {
  const { reviewId, rate, content } = req.body;
  if (!content || !rate) res.status(400).json({ succes: false, msg: 'Please enter all fields' })
  try {
    await Review.updateOne({ _id: reviewId }, { $set: { rate, content } });
    res.status(200).json({ success: true, msg: 'Review successfully updated' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
})

router.delete('/', isAuth, async (req, res) => {
  const { reviewId } = req.body;
  try {
    await Review.deleteOne({ _id: reviewId });
    res.status(200).json({ success: true, msg: 'Review successfully deleted' });
  } catch (err) {
    res.status(400).json({ success: false });
  }
});

module.exports = router;