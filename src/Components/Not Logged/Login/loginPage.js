import React, { useState, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { GamesContext } from '../../../GamesContext';
import { GetGames, Login } from '../../../Services/api';
import './loginPage.scss'

const LoginPage = () => {

  const [loginInput, setLoginInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [logSuccess, setLogSuccess] = useState(null);

  const { setLoggedAccount, setGameList } = useContext(GamesContext);

  const loginRef = useRef();
  const passwordRef = useRef();

  async function TryLogin(e){
    e.preventDefault();
    
    const userLogged = await Login(loginInput, passwordInput);

    setLogSuccess(userLogged !== null);

    if(logSuccess !== false){
      setLoggedAccount(userLogged);
      const userGames = await GetGames(userLogged.uuid);

      if(userGames){
        setGameList(userGames);
      }
    }
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
        <input ref={loginRef} placeholder='Login' type="text" required className="login-input" onChange={(e) => setLoginInput(e.target.value)} />
        <input ref={passwordRef} placeholder='Password' type="password" required className="login-password" onChange={(e) => setPasswordInput(e.target.value)} />
        <p>Forgot password</p>
        <button className="login-btn">Login</button>
      </form>
    </div>
  )
}

export default LoginPage;