import React from 'react';
import { Link } from 'react-router-dom';

const SignIn = ({ switchForm, loginData, handleInputChange, validStyle, handleLoginForm, loginMsg, disabledBtn }) => {
  return (
    <form className="sign__form sign__form--sign-in" style={{ transform: switchForm ? 'translateX(-100%)' : 'translateX(0%)' }} onSubmit={handleLoginForm}>
      <div className="sign__input-box">
        <input type="email" name="email" data-group="login" className="sign__input" value={loginData.email} onChange={handleInputChange} />
        <label className="sign__label" style={loginData.email ? validStyle.label : null}>Email</label>
        <span className="sign__input-bar" style={loginData.email ? validStyle.bar : null}></span>
      </div>
      <div className="sign__input-box">
        <input type="password" name="password" data-group="login" className="sign__input" value={loginData.password} onChange={handleInputChange} />
        <label className="sign__label" style={loginData.password ? validStyle.label : null}>Password</label>
        <span className="sign__input-bar" style={loginData.password ? validStyle.bar : null}></span>
      </div>
      <Link to="#" className="sign__remember-password">Forgot password?</Link>
      <button disabled={disabledBtn} className="sign__button-submit sign__button-submit--sign-in" type="submit">Sign In</button>
      {loginMsg.error && <p className="sign__message sign__message--error">{loginMsg.error}</p>}
      {loginMsg.success && <p className="sign__message sign__message--success">{loginMsg.success}</p>}
    </form>
  )
}

export default SignIn
