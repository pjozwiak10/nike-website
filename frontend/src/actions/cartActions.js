import { ADD_TO_CART, REMOVE_FROM_CART, REMOVE_FROM_CART_ALL, EMPTY_BASKET } from './types';

export const addToCart = (product) => ({
  type: ADD_TO_CART,
  payload: product,
})

export const removeFromCart = (productId) => ({
  type: REMOVE_FROM_CART,
  payload: productId
})

export const removeFromCartAll = (productId) => ({
  type: REMOVE_FROM_CART_ALL,
  payload: productId
});

export const emptyBasket = () => ({
  type: EMPTY_BASKET,
})