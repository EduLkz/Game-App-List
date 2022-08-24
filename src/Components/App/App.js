import { useState } from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import { GamesContext } from '../../GamesContext';
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
  
  return (
    <div className="App">
      <Router>
        <Header/>
      <GamesContext.Provider value={contextObject}>
        <Switch>
          <Route exact path='/'> <MyGames/> </Route>
          <Route exact path='/my-games'> 
            <MyGames/> 
          </Route>
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

