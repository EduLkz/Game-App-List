async function Login(login, password){
    const url = process.env.REACT_APP_API + '/users/login';

    const body = JSON.stringify({
        login: login,
        password: password,
    })
    
    const options = {
        mode: "cors",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }

    try {
        
        const response = await fetch(url, options);
        
        if(response.status === 200){
            const json = await response.json();
            
            const currentUser = {
                uuid: json.user.uuid,
                login: json.user.login,
                fullname: json.user.fullname,
                email: json.user.email   
            }
            
            return currentUser;
        }else{
            return null;
        }
    } catch (error) {
        return null;    
    }
}

async function GetGames(uuid){
    const url = process.env.REACT_APP_API + '/games/' + uuid;
    console.log(url)

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;
    } catch (e) {
        
    }

}

async function CreateAccount(user){
    const url = process.env.REACT_APP_API + '/users/login';

    const body = JSON.stringify({
        fullname: user.fullname,
        email: user.email,
        login: user.login,
        password: user.password
    })
    
    const options = {
        mode: "cors",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }

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

async function ChagePassword(uuid, password, new_password){
    const url = process.env.REACT_APP_API + '/users/change-password';

    const body = JSON.stringify({
        uuid: uuid,
        password: password,
        new_password: new_password,
    })
    
    const options = {
        mode: "cors",
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: body
    }

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


export { Login, GetGames, CreateAccount, ChagePassword };