import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GamesContext } from '../../GamesContext';
import { GetGames } from '../../Services/api';
import Header from '../Header/header';
import Account from '../Logged/Account/account';
import MyGames from '../Logged/MyGames/myGames';
import LoginPage from '../Not Logged/Login/loginPage';
import SignUp from '../Not Logged/SignUp/signUp';
import './App.css';

function App() {

  const [listIndex, setListIndex] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState(null);

  const contextObject = {
    gameList, setGameList,
    listIndex, setListIndex,
    loggedAccount, setLoggedAccount
  }

  useEffect(() => {

    async function UpdateGames(uuid){
      const userGames = await GetGames(uuid);

        if(userGames){
            setGameList(userGames);
        }
    }
    const currentUser = localStorage.getItem('currentUser');
    

    if(currentUser){
      const foundUser = JSON.parse(currentUser);
      setLoggedAccount(foundUser);
      UpdateGames(foundUser.uuid);
    }

  }, [])

  return (
    <div className="App">
      <Router>
        <Header/>
      <GamesContext.Provider value={contextObject}>
        <Switch>
          <Route exact path='/'> <MyGames/> </Route>
          <Route exact path='/account'> 
            { loggedAccount ? <Account account = {loggedAccount}/> : <LoginPage/> }
          </Route>

          <Route exact path='/signup'> <SignUp/> </Route>
        </Switch>
        
      </GamesContext.Provider>
      </Router>
    </div>
  );
}

export default App;

