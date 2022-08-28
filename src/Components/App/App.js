import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { GamesContext } from '../../GamesContext';
import { GetGames } from '../../Services/api';
import Header from '../Header/header';
import Load from '../Load/load';
import Account from '../Logged/Account/account';
import MyGames from '../Logged/MyGames/myGames';
import LoginPage from '../Not Logged/Login/loginPage';
import SignUp from '../Not Logged/SignUp/signUp';
import './App.css';

function App() {

  const [listIndex, setListIndex] = useState(0);
  const [gameList, setGameList] = useState([]);
  const [loggedAccount, setLoggedAccount] = useState(null);
  const [loading, setLoading] = useState(false);

  const contextObject = {
    gameList, setGameList,
    listIndex, setListIndex,
    loggedAccount, setLoggedAccount,
    setLoading
  }

  useEffect(() => {

    async function UpdateGames(user){
      const userGames = await GetGames(user);

        if(userGames){
            setGameList(userGames);
        }
    }
    const currentUser = localStorage.getItem('currentUser');

    if(currentUser && currentUser !== 'null'){
      const foundUser = JSON.parse(currentUser);
      

      if(foundUser.jwt){
        setLoggedAccount(foundUser);
        UpdateGames(foundUser);
      }else{
        localStorage.setItem('currentUser', null);
      }
      
    }

  }, [])

  return (
    <div className="App">
    
      <Router>
        {
          loading === true && <Load/>
        }
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

