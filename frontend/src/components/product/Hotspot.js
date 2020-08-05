import React, { memo } from 'react';
import { Link } from 'react-router-dom';

const Hotspot = memo(({ hotspotProducts }) => {
  return (
    <section className="product__hotspot hotspot">
      <p className="hotspot__headline">You Might Also Like</p>
      <div className="hotspot__products">
        {hotspotProducts.map((product, i) => (
          <div className="hotspot__product" key={i}>
            <Link to={`/${product.link}/id=${product.id}`} className="hotspot__link">
              <img src={product.images[0]} alt={`${product.name}`} className={`hotspot__product-image hotspot__product-image${product.className}`} />
            </Link>
            <p className="hotspot__product-name">{product.name}</p>
            <p className="hotspot__product-type">{product.type}</p>
            <p className="hotspot__product-price">{product.price.formatted}</p>
          </div>
        ))}
      </div>
    </section>
  )
});

export default Hotspot
