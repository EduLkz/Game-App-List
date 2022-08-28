import React, { useContext } from 'react';
import { GamesContext } from '../../../GamesContext';
import './account.scss'
// import { Container } from './styles';

const Account = ( props ) => {

  const { setLoggedAccount, setGameList } = useContext(GamesContext);
  const { fullname, login, email } = props.account;

  function LogOut(){
    setLoggedAccount(null);
    localStorage.setItem('currentUser', null);
    setGameList([]);
  }

  return(
    <div className="account">
      <p>Nome: {fullname}</p>
      <p>Username: {login}</p>
      <p>Email: {email}</p>

      <button>Change Password</button>
      <button onClick={() => { LogOut() }}>Logout</button>
    </div>
  )
}
export default Account;