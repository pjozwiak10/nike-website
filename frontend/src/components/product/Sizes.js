import React, { useState, useEffect } from 'react';

const Sizes = ({ product, handleSize, isLaptop }) => {
  const [sizeGuideOpen, toggleSizeGuide] = useState(null);
  useEffect(() => {
    if (sizeGuideOpen) document.body.style.overflow = 'hidden';
    else if (!sizeGuideOpen && sizeGuideOpen !== null) document.body.style.overflow = 'visible';
  }, [sizeGuideOpen])
  return (
    <section className="product__sizes-container">
      <div className="product__sizes-headline">
        <span className="product__sizes-select-label">Select Size</span>
        <button className="product__sizes-guide-button" onClick={() => toggleSizeGuide(true)}>Size Guide</button>
      </div>
      <div className="product__sizes">
        {product.sizeGuide.sizes.map((size, i) => (
          <div className="product__size" key={i} onClick={(e) => handleSize(e, size.value)}>{product.categories.includes('shoes') ? 'EU' : null} {size.value}</div>
        ))}
      </div>
      <div className="product__sizes-guide-wrapper" style={{
        transform: isLaptop ? (sizeGuideOpen ? 'translateY(0)' : 'translateY(-100%)') : (sizeGuideOpen ? 'translateX(0)' : 'translateX(100%)')
      }}>
        <div className="product__sizes-guide-main">
          <p className="product__sizes-guide-main-label">{product.sizeGuide.type}</p>
          <button className="product__sizes-guide-close" onClick={() => toggleSizeGuide(false)}>close</button>
        </div>
        <div className="product__sizes-guide-info">
          <p className="product__sizes-guide-info-label">find your size</p>
          <p className="product__sizes-guide-info-tip">Use your measurements and the chart below to determine your size.</p>
        </div>
        <p className="product__sizes-guide-info-label">size chart</p>
        <div className="product__sizes-guide" style={{ gridTemplateColumns: `repeat(${product.sizeGuide.labels.length}, 1fr)` }}>
          {product.sizeGuide.labels.map((label, i) => (
            <span className="product__sizes-guide-label" key={i}>{label}</span>
          ))}
          {(() => {
            switch (product.sizeGuide.type) {
              case "men's shoes":
              case "women's shoes":
                return product.sizeGuide.sizes.map((size, i) => (
                  <React.Fragment key={i}>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.value}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.lengthInsert}</span>
                  </React.Fragment>
                ))
              case "men's top":
              case "women's top":
                return product.sizeGuide.sizes.map((size, i) => (
                  <React.Fragment key={i}>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`} >{size.value}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`} >{size.chest}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`} >{size.waist}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`} >{size.hips}</span>
                  </React.Fragment>
                ))
              default:
                return product.sizeGuide.sizes.map((size, i) => (
                  <React.Fragment key={i}>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.value}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.waist}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.hips}</span>
                    <span className={`product__sizes-guide-value ${(i + 1) % 2 === 0 ? '--even' : '--odd'}`}>{size.innerLegLength}</span>
                  </React.Fragment>
                ))
            }
          })()}
        </div>
      </div>
    </section >
  )
}

export default Sizes
