import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { accounts, GamesContext } from '../../../GamesContext';
import './loginPage.scss'

const LoginPage = () => {

  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [logSuccess, setLogSuccess] = useState(null);

  const { setLoggedAccount } = useContext(GamesContext);

  const loginRef = useRef();
  const passwordRef = useRef();

  function TryLogin(e){
    e.preventDefault();
    
    let loginSuccess = false;

    accounts.forEach(ac => {
      if(ac.login === loginInput || ac.email === loginInput){
        loginSuccess = checkPassword(ac);

        if(loginSuccess){
          setLoggedAccount(ac)
        }
      }
    });

    setLogSuccess(loginSuccess);
  }

  function checkPassword(account){
    return account.password === passwordInput;
  }


  return(
    <div className="login-page">
      
      <form action="" className='login-wrapper' onSubmit={TryLogin}>
        <h1>Login</h1>
        <Link to='/signup'> Sign Up </Link>
        {logSuccess === false ? (
          <p className='login-error'>Username and password doesn't match</p>
          ):(
            <br/>
          )
        }
        <input ref={loginRef} placeholder='Login' type="text" className="login-input" onChange={(e) => setLoginInput(e.target.value)} />
        <input ref={passwordRef} placeholder='Password' type="password" className="login-password" onChange={(e) => setPasswordInput(e.target.value)} />
        <p>Forgot password</p>
        <button className="login-btn">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;