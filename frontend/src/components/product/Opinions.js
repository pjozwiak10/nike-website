import React, { useRef, useState, memo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';

const Opinions = memo(({ reviews, averageRate, userReview, handleOpinionsDialogue, handleOpinionsForm }) => {
  const stars = useRef([0, 1, 2, 3, 4]);
  const [opinionsState, setOpinionsState] = useState(false);
  const [opinionsMsg, setOpinionsMsg] = useState({ msg: '', color: '' });
  const [opinionsForm, setOpinionsForm] = useState({
    rate: 5,
    content: '',
  })

  const handleOpinionsInner = useCallback(() => {
    if (!opinionsState) {
      gsap.to('.opinions__arrow-left', { duration: 0.5, rotate: -45 })
      gsap.to('.opinions__arrow-right', { duration: 0.5, rotate: 45 })
      gsap.to('.opinions__inner', { duration: 0.5, height: 'auto', onComplete: () => setOpinionsState(true), })
    } else {
      gsap.to('.opinions__arrow-left', { duration: 0.5, rotate: 45 })
      gsap.to('.opinions__arrow-right', { duration: 0.5, rotate: -45 })
      gsap.to('.opinions__inner', { duration: 0.5, height: 0, onComplete: () => setOpinionsState(false), })
    }
  }, [opinionsState]);

  const handleOpinionsValues = useCallback((e, value) => {
    e.persist();
    setOpinionsForm(state => ({
      ...state,
      [e.target.dataset.id]: value,
    }))
  }, []);

  const handleIncreaseRate = useCallback(() => setOpinionsForm(state => ({ ...state, rate: state.rate < 5 ? state.rate + 0.5 : state.rate })), []);
  const handleDecreaseRate = useCallback(() => setOpinionsForm(state => ({ ...state, rate: state.rate > 1 ? state.rate - 0.5 : state.rate })), []);

  return (
    <section className="product__opinions opinions">
      <div className="opinions__header" onClick={handleOpinionsInner}>
        <p className="opinions__headline">Opinions ({reviews.length})</p>
        <div className="opinions__stars">
          {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
          <div className="opinions__stars-active" style={{ width: `${(averageRate / 5) * 100}%` }}>
            {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
          </div>
        </div>
        <div className="opinions__arrow">
          <span className="opinions__arrow-left"></span>
          <span className="opinions__arrow-right"></span>
        </div>
      </div>
      <div className="opinions__inner">
        <p className="opinions__average-rating">Rating {averageRate ? `${averageRate}/5 stars` : '- no opinions'}</p>
        {userReview ? <p className="opinions__add opinions__add--block">
          You have already added an opinion to this product. You can modify reviews in <Link to="/account">your account</Link>.
        </p>
          : <button className="opinions__add" onClick={handleOpinionsDialogue}>Add opinion</button>}
        {reviews.map(review => (
          <div className="opinions__opinion" key={review._id}>
            <div className="opinions__stars opinions__stars--opinion">
              {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
              <div className="opinions__stars-active" style={{ width: `${(review.rate / 5) * 100}%` }}>
                {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
              </div>
            </div>
            <p className="opinions__opinion-author-date">
              <span className="opinions__opinion-author">{review.author} - </span>
              <span className="opinions__opinion-date">{(new Date(review.createdAt).toDateString()).slice(4)}</span>
            </p>
            <p className="opinions__opinion-content">{review.content}</p>
          </div>
        ))}
      </div>
      <div className="opinions__dialogue-wrapper">
        <div className="opinions__dialogue">
          <button className="opinions__dialogue-close" onClick={handleOpinionsDialogue}>Close</button>
          <h3 className="opinions__dialogue-headline">Write your opinion</h3>
          <form className="opinions__dialogue-form" onSubmit={(e,) => handleOpinionsForm(e, opinionsForm, setOpinionsForm, setOpinionsMsg)}>
            <div className="opinions__dialogue-rating">
              <p className="opinions__dialogue-rating-text">Your rating:</p>
              <div className="opinions__stars opinions__stars--dialogue">
                {stars.current.map((star, i) => <i className="fas fa-star" data-id="rate" key={i} onClick={(e) => handleOpinionsValues(e, i + 1)}></i>)}
                <div className="opinions__stars-active" style={{ width: `${(opinionsForm.rate / 5) * 100}%` }}>
                  {stars.current.map((star, i) => <i className="fas fa-star" key={i}></i>)}
                </div>
              </div>
              <div className="opinions__rate-buttons">
                <span className="opinions__rate-button" onClick={handleIncreaseRate}><i className="fas fa-plus"></i></span>
                <span className="opinions__rate-button" onClick={handleDecreaseRate}><i className="fas fa-minus"></i></span>
              </div>
            </div>
            <textarea name="content" data-id="content" value={opinionsForm.content} className="opinions__dialogue-content" placeholder="Content of the opinion" onChange={(e) => handleOpinionsValues(e, e.target.value)}></textarea>
            <button className="opinions__dialogue-submit" type="submit">Add Opinion</button>
            {opinionsMsg.msg && < span className="opinions__message" style={{ color: opinionsMsg.color }}>{opinionsMsg.msg}</span>}
          </form>
        </div>
      </div>
    </section>
  )
});

export default Opinions
