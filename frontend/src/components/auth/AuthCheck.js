import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../actions/userActions';

const AuthCheck = ({ children }) => {
  const dispatch = useDispatch();
  const authChecked = useSelector(state => state.authChecked);

  useEffect(() => {
    dispatch(authUser());
  }, [dispatch]);

  return (
    <>
      {authChecked && children}
    </>
  )
}

export default AuthCheck;
