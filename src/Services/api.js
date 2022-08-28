import {encode as base64_encode} from 'base-64';

const options = {
    mode: "cors",
    method: "POST",
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'authorization': ''
    },
    body: []
}

async function Login(login, password){
    const url = process.env.REACT_APP_API + '/token';

    const token = base64_encode(login + ':' + password);
    const basicAuth = 'Basic ' + token;

    options.headers.authorization = basicAuth;
    
    const body = JSON.stringify({
        login: login,
        password: password,
    })
    
    options.body = body;

    try {
        const response = await fetch(url, options);
        
        if(response.status === 200){
            const json = await response.json();
            
            const currentUser = {
                uuid: json.user.uuid,
                login: json.user.login,
                fullname: json.user.fullname,
                email: json.user.email,
                jwt: json.token
            }
            
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            return currentUser;
        }else{
            return null;
        }
    } catch (error) {
        return null;    
    }
}


async function GetGames(user){
    const url = process.env.REACT_APP_API + '/games/' + user.uuid;

    options.headers.authorization = 'Bearer ' + user.jwt;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    } catch (e) {
        return false;
    }

}

async function CreateAccount(user){
    const url = process.env.REACT_APP_API + '/users';

    const body = JSON.stringify({
        fullname: user.fullname,
        email: user.email,
        login: user.login,
        password: user.password
    })
    
    options.body = body;

    try {
        const response = await fetch(url, options);

        if(response.status === 201){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return false;
    }
}

async function ChagePassword(user, password, new_password){
    const url = process.env.REACT_APP_API + '/users/change-password';
    options.headers.authorization = 'Bearer ' + user.jwt;

    const body = JSON.stringify({
        uuid: user.uuid,
        password: password,
        new_password: new_password,
    })

    options.body = body;

    try {
        const response = await fetch(url, options);

        if(response.status === 200){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return false;
    }
}

async function CreateGame(new_game, user){
    const url = process.env.REACT_APP_API + '/games';
    options.headers.authorization = 'Bearer ' + user.jwt;

    const body = JSON.stringify({
        new_game: new_game,
    })

    options.body = body;

    try {
        const response = await fetch(url, options);

        if(response.status === 201){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return false;
    }

}

async function UpdateGame(game, user){
    const url = process.env.REACT_APP_API + '/games/update';
    options.headers.authorization = 'Bearer ' + user.jwt;


    const body = JSON.stringify({
        game: game,
    })

    options.body = body;

    try {
        const response = await fetch(url, options);

        if(response.status === 200){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return false;
    }

}

async function DeleteGame(game, user){
    const url = process.env.REACT_APP_API + '/games';
    options.headers.authorization = 'Bearer ' + user.jwt;


    const body = JSON.stringify({
        game: game,
    })

    const opt = options;
    opt.method = 'DELETE'
    opt.body = body;

    try {
        const response = await fetch(url, opt);

        if(response.status === 200){
            return true;
        }else{
            return false;
        }

    } catch (error) {
        return false;
    }
}

export { Login, GetGames, CreateAccount, ChagePassword, CreateGame, UpdateGame, DeleteGame };