import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import cx from 'classnames';

import validateLoginForm from '../utils/validator';
import { login, selectAuth } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: null,
    password: null
  });
  const [formErrors, setFormErrors] = useState({
    username: null,
    password: null
  });
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(selectAuth);
  const history = useHistory();

  const loginHandler = async (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    try {
      const validationResult = await validateLoginForm(formData);

      if(validationResult) {
        dispatch(login(formData));
      }
    } catch (err) {
      const flatErrors = err.inner.flatMap((inner: { path: string; }) => inner.path);

      setFormErrors(oldData => ({
        ...oldData,
        ...flatErrors.reduce((prev: object, curr: string) => {
          return {...prev, [curr]: true}
        },  {})
      }))
    }
  }

  const inputChangeHandler = (key: string, value: string) => {
    setFormData(oldData => ({
      ...oldData,
      [key]: value
    }));

    setFormErrors(oldData => ({
      ...oldData,
      [key]: false
    }));
  }

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/games');
    }
  },[isAuthenticated, history])

  return (
    <div className="login">
      <div className="ui grid centered">
        <form>
          <div className="fields">
            <div className="required field">
              <div className={cx('ui icon input', {'error': formErrors.username})}>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => inputChangeHandler('username', e.target.value)}/>
                  <i className="user icon"/>
              </div>
            </div>
            <div className="required field">
              <div className={cx('ui icon input', {'error': formErrors.password})}>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => inputChangeHandler('password', e.target.value)}/>
                  <i className="lock icon"/>
              </div>
            </div>
            <div className="field">
              <div className="ui icon input">
                <input type="submit" value="Login" onClick={loginHandler}/>
                  <i className="right chevron icon"/>
              </div>
            </div>
            {error && <div className="ui error message">
              <ul className="list">
                <li>{error}</li>
              </ul>
            </div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
