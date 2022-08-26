import React, { useContext } from 'react';
import { GamesContext } from '../../GamesContext';
import { DeleteGame, GetGames, UpdateGame } from '../../Services/api';
import './game.scss'

const Game = ( props ) => {

    const game = props.game;
    const { setGameList, loggedAccount } = useContext(GamesContext);
        

    function updateType(add){

        let newTypeIndex = game.game_type;
        if(add){
            if(newTypeIndex < 2){
                newTypeIndex += 1;
            }
        }else{
            if(newTypeIndex > 0){
                newTypeIndex -= 1;
            }
        }

        ChangeGame(newTypeIndex)
    }

    async function RemoveGame(){
        const deleted = DeleteGame(game)
        
        if(deleted === false){
            alert('Cannot remove game');
            return;
        }

        await UpdateGameList();
    }

    async function ChangeGame(value){
        let new_game = game;
        new_game.game_type = value;

        const updatedGame = await UpdateGame(new_game);

        if(updatedGame === false){
            alert('Cannot update game state');
            return;
        }

        await UpdateGameList();
    }

    async function UpdateGameList(){
        const userGames = await GetGames(loggedAccount.uuid);
        
        if(userGames){
            setGameList(userGames);
        }
    }

    return(
        <div className="game-info">
            <div className='game-name'>
            <p>Name: </p> <p className='info'>{game.game_name}</p>
            </div>

            <div>
            <p>Date Added: </p> <p className='info'>{game.date_added}</p>
            </div>

            <div className='action-buttons'>
                {game.game_type > 0 &&  <button onClick={() => {updateType(false)}}> {'<<'} </button>}
                <button onClick={RemoveGame}> - </button>
                {game.game_type < 2 &&  <button onClick={() => {updateType(true)}}> {'>>'} </button>}
            </div>
        </div>
    )

}

export default Game;