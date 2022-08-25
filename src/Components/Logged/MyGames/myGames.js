import React, { useContext, useState, useRef } from 'react';
import { GamesContext } from '../../../GamesContext';
import './myGames.scss'

const MyGames = () => {
    const { 
        gameList, setGameList ,
        listIndex, setListIndex
        } = useContext(GamesContext);
        
    const [listSection, setListSection] = useState('To Play');
    const [tableClass, setTableClas] = useState('to-play');

    const [input, setInput] = useState('');
    const inputRef = useRef(null)

    function AddGame(e){
        e.preventDefault();
        
        if(input.length <= 0){
            alert("Game cannot be empty");
            return;
        }

        const timeElapsed = Date.now();
        const today = new Date(timeElapsed).toLocaleString();

        const new_game = {
            game_name: input,
            date_added: today,
            game_type: listIndex
        }

        if(gameList){
            setGameList(oldArray => [...oldArray, new_game]);
        }else{
            setGameList([new_game]);
        }

        setInput('');
        inputRef.current.value = '';
    }

    function RemoveGame(game){
        const list = gameList;
        const index = list.indexOf(game);
        
        if(index > -1){
            list.splice(index, 1);
        }
        
        setGameList([...list]);
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
            <table className={`game-table-${tableClass}`}>
                <thead>
                    <tr>
                        <th>Game Name</th>
                        <th>Date Added</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        (gameList.map((g) => {
                            return (
                                g.game_type === listIndex && (
                                    <tr key={g.game_name}>
                                        <td>{g.game_name}</td>
                                        <td>{g.date_added}</td>
                                        <td>
                                            <button onClick={() => RemoveGame(g)}> - </button>
                                        </td>
                                    </tr>
                                )
                            )
                        }))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default MyGames;
