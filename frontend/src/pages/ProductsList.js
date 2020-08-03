import React, { useRef, useEffect, useState } from 'react';
import PageTransition from '../components/page-transition/PageTransition';
import products from '../data/products';
import Main from '../components/products-list/Main';
import { useMediaQuery } from 'react-responsive';

const ProductsList = ({ match }) => {
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [hoverProduct, setHoverProduct] = useState(null);
  const [activeVariant, setActiveVariant] = useState({ id: null, image: null });
  const urlParam = useRef(null);

  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });

  useEffect(() => {
    if (match.params.category) {
      urlParam.current = match.params.category;
      setSearchedProducts(state => (
        products.filter(product => product.categories.includes(urlParam.current)).map((searchedProduct, i, searchedArr) => ({
          ...searchedProduct,
          variants: searchedProduct.variants.map(variant => {
            const searchedVariant = searchedArr.find(searchedProduct => searchedProduct.id === variant.id);
            return { id: searchedVariant.id, link: searchedVariant.link, thumbnail: searchedVariant.images[0] };
          }),
        })).sort((a, b) => new Date(b.date) - new Date(a.date))
      ));
    } else if (match.params.search) {
      urlParam.current = match.params.search;
      const formattedValue = urlParam.current.trim().toLowerCase();
      setSearchedProducts(state => products.filter(product => product.name.toLowerCase().includes(formattedValue) || product.colors.toLowerCase().includes(formattedValue) || product.type.toLowerCase().includes(formattedValue) || product.categories.some(category => category.toLowerCase().includes(formattedValue))).map(searchedProduct => ({
        ...searchedProduct,
        variants: searchedProduct.variants.map(variant => {
          const searchedVariant = products.find(searchedProduct => searchedProduct.id === variant.id);
          return { id: searchedVariant.id, link: searchedVariant.link, thumbnail: searchedVariant.images[0] };
        }),
      })).sort((a, b) => new Date(b.date) - new Date(a.date)))
    }
  }, [match.params.category, match.params.search]);

  const handleHoverProduct = (e, id) => {
    setHoverProduct(id);
    if (e.type === 'mouseleave') {
      setHoverProduct(null);
      setActiveVariant({ id: null, image: null });
    }
  }

  const handleHoverActiveVariant = (id, image) => {
    setActiveVariant({ id, image });
  }

  return (
    <PageTransition>
      <div className="products-list">
        <div className="products-list__banner">
          <img src={require('../assets/products-list/banner.jpg')} alt="banner" className="products-list__banner-image" />
        </div>
        <Main title={urlParam.current} params={match.params} searchedProducts={searchedProducts} handleHoverProduct={handleHoverProduct} hoverProduct={hoverProduct} isLaptop={isLaptop} handleHoverActiveVariant={handleHoverActiveVariant} activeVariant={activeVariant} />
      </div>
    </PageTransition>
  )
}

export default ProductsList;
