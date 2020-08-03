const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
  productId: {
    type: Number,
    required: true,
  },
  favUsers: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }]
});

module.exports = Product = mongoose.model('Product', productSchema);