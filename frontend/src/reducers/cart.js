import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_CART_ALL, EMPTY_BASKET } from '../actions/types';

const updateStateAdd = (cart, newProduct) => {
  const { id, link, name, type, price, images, colors, className, size } = newProduct;
  const productInCartAndSameSize = cart.some(product => (product.id === id && product.size === size));
  return (
    productInCartAndSameSize ?
      cart.map(product => (product.id === id && product.size === size) ? { ...product, quantity: product.quantity + 1 } : product)
      : [...cart, { id, link, name, type, price, images, colors, className, size, quantity: 1 }]);
}

const updateStateRemove = (cart, productId) => {
  return cart.map(product => product.id === productId ? { ...product, quantity: product.quantity - 1 } : product).filter(product => product.quantity > 0);
}

const cart = (state = [], action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return state = updateStateAdd(state, action.payload);
    case REMOVE_FROM_CART:
      return state = updateStateRemove(state, action.payload)
    case REMOVE_FROM_CART_ALL:
      return state = state.filter(product => product.id !== action.payload)
    case EMPTY_BASKET:
      return state = [];
    default:
      return state;
  }
}

export default cart;