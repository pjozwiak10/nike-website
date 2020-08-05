import React, { useEffect, memo } from 'react'
import Swiper from 'react-id-swiper';

const ProductGallery = memo(({ product, isLaptop, isDesktop }) => {

  useEffect(() => {
    if (isDesktop) {
      document.querySelector('.product__gallery').prepend(document.querySelector('.product__gallery-nav'));
    }
  }, [isDesktop])

  const params = {
    containerClass: 'swiper-container product__gallery-swiper',
    speed: 500,
    effect: isLaptop ? 'fade' : 'slide',
    fadeEffect: { crossFade: true },
    spaceBetween: 7.5,
    pagination: isLaptop ?
      {
        el: '.swiper-pagination.product__gallery-nav',
        clickable: true,
        bulletClass: 'product__gallery-nav-item',
        bulletActiveClass: 'product__gallery-nav-item--active',
        renderBullet: (index, className) => {
          return `<div class="${className}"><img alt="${product.name}" src="${product.images[index]}" class="product__gallery-nav-image product__gallery-nav-image${product.className}"/></div>`;
        },
      }
      :
      {
        el: '.swiper-pagination.product__gallery-pagination',
        type: 'progressbar',
        progressbarFillClass: 'product__gallery-pagination--progressbar',
      },
  }
  return (
    <section className="product__gallery">
      <Swiper {...params}>
        {product.images.map((image, i) => (
          <div className="product__gallery-slide" key={i}>
            <img src={image} alt={product.name} className="product__gallery-image" />
          </div>
        ))}
      </Swiper>
    </section>
  )
});

export default ProductGallery;
