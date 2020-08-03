import React from 'react';
import { Link } from 'react-router-dom';

const Main = ({ searchedProducts, title, params, handleHoverProduct, hoverProduct, isLaptop, handleHoverActiveVariant, activeVariant }) => {

  const handleWheelVariants = (e) => {
    const el = e.currentTarget;
    if (el.scrollWidth <= el.clientWidth) return;
    const toLeft = e.deltaY < 0 && el.scrollLeft > 0;
    const toRight = e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth;
    const x = window.scrollX;
    const y = window.scrollY;
    window.onscroll = () => { window.scrollTo(x, y) };
    if (toLeft || toRight) el.scrollBy({ left: e.deltaY / 10 });
    if (e.type === 'mouseleave') window.onscroll = undefined;
  }

  return (
    <main className="products-list__main">
      {params.search ? <h1 className="products-list__headline products-list__headline--search">Search results for "{title}" <span className="products-list__result-number">({searchedProducts.length})</span></h1>
        : <h1 className="products-list__headline">{title} <span className="products-list__result-number">({searchedProducts.length})</span></h1>}
      {searchedProducts.length ? searchedProducts.map(product => (
        <div className="products-list__product" data-id={product.id} key={product.id}>
          <Link to={(hoverProduct === product.id && activeVariant.id) ? `/${product.link}/id=${activeVariant.id}` : `/${product.link}/id=${product.id}`} className="products-list__product-link"
            onMouseOver={(isLaptop && product.variants.length > 1) ? (e) => handleHoverProduct(e, product.id) : undefined}
            onMouseLeave={(isLaptop && product.variants.length > 1) ? (e) => handleHoverProduct(e, product.id) : undefined}>
            <div className={`products-list__image-container products-list__image-container${product.className}`}>
              <img src={(hoverProduct === product.id && activeVariant.image) ? activeVariant.image : product.images[0]} alt={product.name} className={`products-list__image products-list__image${product.className}`} />
            </div>
            <div className="products-list__product-description">
              <p className="products-list__product-name">{product.name}</p>
              <p className="products-list__product-price">{product.price.formatted}</p>
              <p className="products-list__product-type">{product.type}</p>
              <div className="products-list__product-variants" onWheel={handleWheelVariants} onMouseLeave={handleWheelVariants}>
                <span style={{ visibility: hoverProduct === product.id ? 'hidden' : 'visible' }}>{product.variants.length} {product.variants.length > 1 ? 'Colours' : 'Colour'}</span>
                {hoverProduct === product.id && <div className="products-list__product-variants-icons">
                  {product.variants.map((variant, i) => (
                    <span className="products-list__product-variant-link" key={i}
                      style={{ borderColor: activeVariant.id === variant.id ? '#000' : (i === 0 && !activeVariant.id && '#000') }}
                      onMouseOver={() => handleHoverActiveVariant(variant.id, variant.thumbnail)}>
                      <img src={variant.thumbnail} alt={product.name} className="products-list__product-variant-icon" />
                    </span>
                  ))}
                </div>}
              </div>
            </div>
          </Link>
        </div>
      )) : <div className="products-list__search-failure">
          <img src={require('../../assets/products-list/search-failure.svg')} alt="search-failure" className="products-list__search-failure-icon" />
          <p className="products-list__search-failure-text">The product sought was not found</p>
        </div>
      }
    </main >
  )
}

export default Main
