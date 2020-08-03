import React from 'react';
import { Link } from 'react-router-dom';

const Variants = ({ product }) => {
  return (
    <section className="product__variants">
      {product.variants.map((variant, i) => (
        <div className="product__variant" key={i} style={{ border: variant.id === product.id ? '1.5px solid #000' : '1.5px solid transparent' }}>
          <Link to={`/${variant.link}/id=${variant.id}`} className="product__variant-link">
            <img src={variant.image} alt="" className={`product__variant-image product__variant-image${product.className}`} />
          </Link>
        </div>
      ))}
    </section>
  )
}

export default Variants;
