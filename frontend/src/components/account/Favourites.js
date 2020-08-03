import React from 'react';
import { Link } from 'react-router-dom';

const Favourites = ({ favourites, handleRemoveFavourite }) => {
  return (
    <div className="account__content account__favourites">
      {favourites.length ? favourites.map((favourite, i) => (
        <div className="account__favourite" key={i}>
          <Link to={`/${favourite.link}/id=${favourite.id}`} className="account__favourite-link">
            <img src={favourite.image} alt={favourite.name} className="account__favourite-image" />
            <div className="account__favourite-data">
              <p className="account__favourite-name">{favourite.name}</p>
              <p className="account__favourite-type">{favourite.type}</p>
              <p className="account__favourite-price">{favourite.price.formatted}</p>
            </div>
          </Link>
          <button className="account__favourite-remove" onClick={() => handleRemoveFavourite(favourite.id)}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      )) : <p className="account__favourites-empty">You don't have any products in favourites
      </p>}
    </div>
  )
}

export default Favourites;
