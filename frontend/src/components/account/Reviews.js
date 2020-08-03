import React, { useRef } from 'react';
import { Link } from 'react-router-dom';

const Reviews = ({ reviews, editReview, handleEditReview, handleChangeReview, handleCancelReview, handleConfirmReview, handleDeleteReview, handleIncreaseRate, handleDecreaseRate }) => {
  const stars = useRef([0, 1, 2, 3, 4]);
  return (
    <div className="account__content account__reviews">
      {reviews.length ? reviews.map((review, i) => (
        <div className="account__review" key={i} style={{ border: review._id === editReview._id ? '1px solid #f1f1f1' : '1px solid transparent' }}>
          <div className="account__review-rate">
            <div className="account__review-stars">
              {stars.current.map((star, i) => <i className="fas fa-star" data-id="rate" key={i}
                onClick={review._id === editReview._id ? (e) => handleChangeReview(e, i + 1) : undefined}
              ></i>)}
              <div className="account__review-stars-active" style={{ width: `${((review._id === editReview._id ? editReview.rate : review.rate) / 5) * 100}%` }}>
                {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
              </div>
            </div>
            <p className="account__review-rate-value">{review._id === editReview._id ? editReview.rate : review.rate}/5</p>
            {review._id === editReview._id ? <div className="account__rate-buttons">
              <button className="account__rate-button" onClick={handleDecreaseRate}><i className="fas fa-minus"></i></button>
              <button className="account__rate-button" onClick={handleIncreaseRate}><i className="fas fa-plus"></i></button>
            </div> : null}
          </div>
          <div className="account__review-content">
            <label className="account__review-label">Content of the opinion</label>
            <textarea className="account__review-content-textarea" data-id="content" value={review._id === editReview._id ? editReview.content : review.content} disabled={review._id === editReview._id ? false : true} onChange={(e) => handleChangeReview(e, e.target.value)}></textarea>
          </div>
          <p className="account__review-product-name">Product - <Link to={`/${review.productData.link}/id=${review.productId}`}>{review.productData.name}</Link></p>
          <p className="account__review-date">Date - <span>{(new Date(review.createdAt).toDateString()).slice(4)}</span></p>
          <div className="account__review-buttons">
            {review._id === editReview._id ? <>
              <button className="account__review-button account__review-button--confirm" onClick={handleConfirmReview}><i className="fas fa-check"></i></button>
              <button className="account__review-button account__review-button--cancel" onClick={handleCancelReview}><i className="fas fa-times"></i></button>
            </> : <>
                <button className="account__review-button account__review-button--edit"
                  onClick={() => handleEditReview(review._id, review.content, review.rate)}>
                  <i className="fas fa-pen"></i></button>
                <button className="account__review-button account__review-button--remove" onClick={() => handleDeleteReview(review._id)}><i className="fas fa-trash-alt"></i></button>
              </>}
          </div>
        </div>
      )) : <p className="account__reviews-empty">You don't added any reviews
      </p>}
    </div>
  )
}

export default Reviews
