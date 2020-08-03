import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useMediaQuery } from 'react-responsive';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import PageTransition from '../components/page-transition/PageTransition';
import SignIn from '../components/signup-signin/SignIn';
import SignUp from '../components/signup-signin/SignUp';
import useHoverEffect from '../hooks/useHoverEffect';

const SignUpSignIn = ({ history }) => {
  const [switchForm, setSwitchForm] = useState(false);
  const [formData, setFormData] = useState({
    login: { email: '', password: '' },
    register: { name: '', email: '', password: '', terms: false },
  });
  const [loginMsg, setLoginMsg] = useState({ success: '', error: '' });
  const [registerMsg, setRegisterMsg] = useState({ success: '', error: '' });
  const [disabledBtn, setDisabledBtn] = useState(false);

  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const isTablet = useMediaQuery({ query: '(min-width: 768px)' });
  const isLaptop = useMediaQuery({ query: '(min-width: 1024px)' });
  useHoverEffect(isLaptop ? ['.sign__remember-password'] : null);

  useEffect(() => {
    if (user.isAuthenticated) {
      setTimeout(() => {
        if (!history.location.state) return history.push('/');
        history.push(history.location.state.from)
      }, [1000])
    }
  }, [user, history]);

  const handleInputChange = (e) => {
    e.persist();
    if (e.target.type === 'checkbox') {
      setFormData(state => ({
        ...state,
        register: { ...state.register, terms: e.target.checked },
      }))
    } else {
      setFormData(state => ({
        ...state,
        [e.target.dataset.group]: { ...state[e.target.dataset.group], [e.target.name]: e.target.value },
      }))
    }
  }

  const handleRegisterForm = async (e) => {
    e.preventDefault();
    const { name, email, password, terms } = formData.register;
    if (!name || !email || !password) return setRegisterMsg(state => ({ ...state, error: 'Please enter all fields' }));
    if (!terms) return setRegisterMsg(state => ({ ...state, error: 'Please select our terms and conditions' }));
    const registerData = { name, email, password, terms };
    document.querySelector('.sign__button-submit--sign-up').focus();
    setDisabledBtn(true);
    try {
      const response = await axios.post('/api/users/registration', registerData);
      setRegisterMsg({ error: '', success: response.data.msg });
      setFormData({
        login: { email: '', password: '' },
        register: { name: '', email: '', password: '', terms: false },
      });
      setTimeout(() => {
        document.querySelector('.sign__button-submit--sign-up').blur();
        setSwitchForm(false);
        setRegisterMsg({ success: '', error: '' });
        setDisabledBtn(false);
      }, 1000);
    } catch (err) {
      setRegisterMsg(state => ({ ...state, error: err.response.data.msg }));
      setDisabledBtn(false);
    }
  }

  const handleLoginForm = async (e) => {
    e.preventDefault();
    const { email, password } = formData.login;
    if (!email || !password) return setLoginMsg(state => ({ ...state, error: 'Please enter all fields' }));
    const loginData = { email, password };
    document.querySelector('.sign__button-submit--sign-in').focus();
    setDisabledBtn(true);
    try {
      const response = await axios.post('/api/users', loginData);
      setFormData(state => ({ ...state, login: { email: '', password: '' } }));
      dispatch(login(response.data));
      setLoginMsg({ error: '', success: response.data.msg });
    } catch (err) {
      setLoginMsg(state => ({ ...state, error: err.response.data.msg }))
      dispatch(login(err.response.data));
      setDisabledBtn(false);
    }
  }

  const validStyle = { label: { fontSize: isTablet ? '17px' : '13px', top: 0, }, bar: { transform: 'scaleX(1)' }, };

  return (
    <PageTransition>
      <div className="sign">
        <div className="sign__inner">
          <button className="sign__switch-button" onClick={() => setSwitchForm(!switchForm)}>
            <p className="sign__switch-text">Sign In</p>
            <p className="sign__switch-text">Sign Up</p>
            <div className="sign__switch-bg" style={{ transform: switchForm ? 'translateX(100%)' : 'translateX(0%)' }}></div>
          </button>
          <div className="sign__social-login">
            <a href="https://www.facebook.com/" className="sign__social-login-link">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com/explore" className="sign__social-login-link">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://mail.google.com/" className="sign__social-login-link">
              <i className="fab fa-google"></i>
            </a>
          </div>
          <div className="sign__form-container">
            <SignIn disabledBtn={disabledBtn} loginMsg={loginMsg} handleLoginForm={handleLoginForm} switchForm={switchForm} loginData={formData.login} handleInputChange={handleInputChange} validStyle={validStyle} />
            <SignUp disabledBtn={disabledBtn} registerMsg={registerMsg} handleRegisterForm={handleRegisterForm} switchForm={switchForm} registerData={formData.register} handleInputChange={handleInputChange} validStyle={validStyle} />
          </div>
        </div>
      </div>
    </PageTransition>
  )
}

export default SignUpSignIn;
