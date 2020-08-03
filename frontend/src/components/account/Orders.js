import React from 'react';
import { Link } from 'react-router-dom';

const Orders = ({ orders, handleActiveOrder, activeOrder }) => {
  return (
    <div className="account__content account__orders">
      {orders.length ? <>
        {orders.map((order, i) => (
          <div className="account__order" key={i}>
            <p className="account__order-main-info">Order number <strong>{order.orderNumber}</strong></p>
            <p className="account__order-main-info">Order value <strong>{order.total} {order.currency}</strong></p>
            <p className="account__order-main-info">Date <strong>{(new Date(order.createdAt).toDateString()).slice(4)}</strong></p>
            <button className="account__order-button" onClick={() => handleActiveOrder(order._id)}>Details <i className="fas fa-angle-right"></i></button>
          </div>
        ))}
        <div className="account__order-details">
          {activeOrder && <>
            <button className="account__order-details-close" onClick={handleActiveOrder}><i className="fas fa-chevron-right"></i></button>
            <p className="account__order-detail">Order number: <span>{activeOrder.orderNumber}</span></p>
            <div className="account__order-details-products">
              <p className="account__order-details-headline">Ordered Products</p>
              {activeOrder.products.map((product, i) => (
                <div className="account__order-details-product" key={i}>
                  <Link to={`/${product.link}/id=${product.id}`} className="account__order-details-product-link">
                    <img src={product.image} alt={product.name} className="account__order-details-product-image" />
                    <div className="account__order-details-product-data">
                      <p className="account__order-details-product-info">{product.name}</p>
                      <p className="account__order-details-product-info account__order-details-product-info--type">{product.type}</p>
                      <p className="account__order-details-product-info">{product.price.formatted}</p>
                    </div>
                  </Link>
                  <div className="account__order-details-product-selected">
                    <p className="account__order-details-product-size">Size: <span>{product.size}</span></p>
                    <p className="account__order-details-product-quantity">Quantity: <span>{product.quantity}</span></p>
                  </div>
                </div>
              ))}
            </div>
            <div className="account__order-details-shipping">
              <p className="account__order-details-headline">Shipping Info</p>
              <p className="account__order-details-shipping-info">Address: <span>{activeOrder.shipping.address}</span></p>
              <p className="account__order-details-shipping-info">City: <span>{activeOrder.shipping.city}</span></p>
              <p className="account__order-details-shipping-info">Zip-code: <span>{activeOrder.shipping.zipCode}</span></p>
              <p className="account__order-details-shipping-info">Country: <span>{activeOrder.shipping.country}</span></p>
              <p className="account__order-details-shipping-info">Phone: <span>{activeOrder.shipping.phone}</span></p>
            </div>
            <p className="account__order-detail">Order value: <span>{activeOrder.total} {activeOrder.currency}</span></p>
            <p className="account__order-detail">Date: <span>{(new Date(activeOrder.createdAt).toDateString()).slice(4)}</span></p>
          </>}
        </div>
      </>
        : <p className="account__orders-empty">You haven't placed any order yet</p>}
    </div >
  )
}

export default Orders
