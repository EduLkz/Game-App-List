import React, { useContext } from 'react';
import { GamesContext } from '../../../GamesContext';

// import { Container } from './styles';

const Account = ( props ) => {

  const { setLoggedAccount, setGameList } = useContext(GamesContext);
  const { fullname, login, email } = props.account;

  function LogOut(){
    setLoggedAccount(null);
    setGameList([]);
  }

  return(
    <div className="account">
      {console.log(fullname)}
      <p>Nome: {fullname}</p>
      <p>Username:{login}</p>
      <p>Email: {email}</p>

      <button>Change Password</button>
      <button onClick={() => { LogOut() }}>Logout</button>
    </div>
  )
}
export default Account;