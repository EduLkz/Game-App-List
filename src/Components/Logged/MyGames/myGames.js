import React, { useContext, useState, useRef } from 'react';
import { GamesContext } from '../../../GamesContext';
import { CreateGame, GetGames } from '../../../Services/api';
import Game from '../../Game/game';
import './myGames.scss'

const MyGames = () => {
    const { 
        gameList, setGameList ,
        listIndex, setListIndex,
        loggedAccount, setLoading
        } = useContext(GamesContext);
        
    const [listSection, setListSection] = useState('To Play');
    const [tableClass, setTableClas] = useState('to-play');

    const [input, setInput] = useState('');
    const inputRef = useRef(null)

    async function AddGame(e){
        e.preventDefault();

        if(!loggedAccount){
            alert("You must be logged to add a game");
            return;
        }
        
        if(input.length <= 0){
            alert("Game cannot be empty");
            return;
        }

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed).toLocaleString();

        const new_game = {
            user_uuid: loggedAccount.uuid,
            game_name: input,
            date_added: today,
            game_type: listIndex
        }

        const game_added = await CreateGame(new_game, loggedAccount);

        
        setInput('');
        inputRef.current.value = '';

        if(game_added === false){
            alert('Couldn\'t add game');
        }
        
        const userGames = await GetGames(loggedAccount);
            
        if(userGames){
            setGameList(userGames);
        }
    }

    function ChangeIndex(index){
        setListIndex(index);

        let section;

        switch (index) {
            case 0:
            default:
                section = 'To Play';
                break;
            case 1:
                section = 'Playing';
                break;
            case 2:
                section = 'Finished';
                break;
        }

        let table = section.toLowerCase().replace(' ', '-');

        setListSection(section);
        setTableClas(table);
    }


    return (
        <div className="games">
            <form onSubmit={AddGame} className='add-game'>
                <input ref={inputRef} placeholder='Game Name' onChange={(e) => { setInput(e.target.value) }}/>
                <button type='Submit' className='submit'>+</button>
            </form>

            <nav className='game-nav'>
                <li><button className="section-select" onClick={() => ChangeIndex(0)}>To play</button></li>
                <li><button className="section-select" onClick={() => ChangeIndex(1)}>Playing</button></li>
                <li><button className="section-select" onClick={() => ChangeIndex(2)}>Finish</button></li>
            </nav>
            <h1>{listSection}</h1>

            <div className={`game-list-${tableClass}`}>
                
            <GamesContext.Provider value={{ gameList, setGameList, loggedAccount, setLoading }}>
            {
                (gameList.map((g) => {
                    return (
                        g.game_type === listIndex && (
                            <Game key={g.game_name} game={g}/>
                        )
                    )
                }))
            }
            </GamesContext.Provider>

            </div>
        </div>
    );
}

export default MyGames;
