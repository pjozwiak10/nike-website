import React from 'react'

const Buttons = ({ handleShowContent, disabledBtn }) => {
  return (
    <>
      <button className="account__button account__button--favourites" disabled={disabledBtn} data-id='favourites' onClick={handleShowContent}>Favourites</button>
      <button className="account__button account__button--reviews" disabled={disabledBtn} data-id='reviews' onClick={handleShowContent}>Reviews</button>
      <button className="account__button account__button--orders" disabled={disabledBtn} data-id='orders' onClick={handleShowContent}>Orders</button>
    </>
  )
}

export default Buttons
