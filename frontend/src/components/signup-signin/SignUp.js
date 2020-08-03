import React from 'react'

const SignUp = ({ switchForm, registerData, handleInputChange, validStyle, handleRegisterForm, registerMsg, disabledBtn }) => {
  return (
    <form className="sign__form sign__form--sign-up" style={{ transform: switchForm ? 'translateX(0)' : 'translateX(100%)' }} onSubmit={handleRegisterForm}>
      <div className="sign__input-box">
        <input type="text" name="name" data-group="register" className="sign__input" value={registerData.name} onChange={handleInputChange} />
        <label className="sign__label" style={registerData.name ? validStyle.label : null}>Name</label>
        <span className="sign__input-bar" style={registerData.name ? validStyle.bar : null}></span>
      </div>
      <div className="sign__input-box">
        <input type="email" name="email" data-group="register" className="sign__input" value={registerData.email} onChange={handleInputChange} />
        <label className="sign__label" style={registerData.email ? validStyle.label : null}>Email</label>
        <span className="sign__input-bar" style={registerData.email ? validStyle.bar : null}></span>
      </div>
      <div className="sign__input-box">
        <input type="password" name="password" data-group="register" className="sign__input" value={registerData.password} onChange={handleInputChange} />
        <label className="sign__label" style={registerData.password ? validStyle.label : null}>Password</label>
        <span className="sign__input-bar" style={registerData.password ? validStyle.bar : null}></span>
      </div>
      <div className="sign__terms">
        <input type="checkbox" name="terms" data-group="register" className="sign__terms-input" checked={registerData.terms} onChange={handleInputChange} />
        <label className="sign__terms-label">I agree to the Terms & Condition</label>
      </div>
      <button disabled={disabledBtn} className="sign__button-submit sign__button-submit--sign-up" type="submit">Sign Up</button>
      {registerMsg.error && <p className="sign__message sign__message--error">{registerMsg.error}</p>}
      {registerMsg.success && <p className="sign__message sign__message--success">{registerMsg.success}</p>}
    </form>
  )
}

export default SignUp
