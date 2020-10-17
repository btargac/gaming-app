import React, { MouseEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";

import { login, selectAuth } from '../store/slices/authSlice';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    username: null,
    password: null
  });
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector(selectAuth);
  const history = useHistory();

  const loginHandler = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();

    if(formData.username && formData.password) {
      dispatch(login(formData));
    }
  }

  const inputChangeHandler = (key: string, value: string) => {
    setFormData(oldData => ({
      ...oldData,
      [key]: value
    }))
  }

  useEffect(() => {
    if(isAuthenticated) {
      history.push('/games');
    }
  },[isAuthenticated, history])

  return (
    <div className="login">
      <div className="ui grid centered">
        {error && <div className="fields">
          {error}
        </div>}
        <form>
          <div className="fields">
            <div className="required field">
              <div className="ui icon input">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={(e) => inputChangeHandler('username', e.target.value)}/>
                  <i className="user icon"/>
              </div>
            </div>
            <div className="required field">
              <div className="ui icon input">
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
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
