const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const users = require('./api/routes/users');
const products = require('./api/routes/products');
const reviews = require('./api/routes/reviews');
const orders = require('./api/routes/orders');

const app = express();
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.indexOf(origin) > -1) {
    cors({ origin: origin, credentials: true, });
  }
  return next();
})

app.use(express.json());

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false });
    console.log('MongoDB connected...');
  } catch (err) {
    console.log(err);
  }
})();

app.use('/api/users', users);
app.use('/api/products', products);
app.use('/api/reviews', reviews);
app.use('/api/orders', orders);

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));



