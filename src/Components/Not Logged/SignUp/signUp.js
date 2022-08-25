import React, { useRef, useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { CreateAccount } from '../../../Services/api';
import './signUp.scss';

const SignUp = () => {

    const history = useHistory ()

    const [nameInput, setNameInput] = useState('');
    const [loginInput, setLoginInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [confirmInput, setConfirmInput] = useState('');

    const [errorText, setErrorText] = useState('');

    const nameRef = useRef();
    const loginRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmRef = useRef();


    function SubmitForm(e){
        e.preventDefault();

        if(nameInput.length < 3) { 
            setErrorText('name must be longer than 3 characters'); 
            return; 
        } 
        
        if(nameInput.length > 50) { 
            setErrorText('name must be less than 50 characters'); 
            return;     
        }
        if(loginInput.length < 3) { 
            setErrorText('login must be longer than 3 characters'); 
            return;     
        }
         if(loginInput.length > 12) { 
            setErrorText('login must be less than 12 characters'); 
            return;     
        }
        if(passwordInput.length < 6) { 
            setErrorText('password must be longer than 6 characters'); 
            return;     
        } 
        if(passwordInput.length > 20) { 
            setErrorText('password must be less than 20 characters'); 
            return;     
        }
        if(passwordInput !== confirmInput) { 
            setErrorText('passwords doesn\'t match'); 
            return;
        }

        setErrorText('');

        nameRef.current.value = '';
        loginRef.current.value = '';
        emailRef.current.value = '';
        passwordRef.current.value = '';
        confirmRef.current.value = '';

        const newUser = {
            fullname: nameInput,
            email: emailInput,
            login: loginInput,
            password: passwordInput
        }

        const new_account = CreateAccount(newUser);

        if(new_account === true){
            history.push('/account')
        }
    }
    

    return(
        <div className="signup">
            <form className='signup-form' onSubmit={SubmitForm}>
                <h1>    SIGN UP     </h1>
                <p className={errorText.length > 0 ? 'error-text' : ''}>{errorText}</p>
                <label>Full name:</label>
                <input ref={ nameRef } type="text" name='fullname' placeholder='Fullname' required onChange={ (e) => { setNameInput(e.target.value) }}/>
                <br/>
                <label>Login:</label>
                <input ref={ loginRef } type="text" name='login' placeholder='Login' required onChange={ (e) => { setLoginInput(e.target.value) }}/>
                <br/>
                <label>Email:</label>
                <input ref={ emailRef } type="emai" name='email' placeholder='Email' required onChange={ (e) => { setEmailInput(e.target.value) }}/>
                <br/>
                <label>Password:</label>
                <input ref={ passwordRef } type="password" name='password' placeholder='Password' required onChange={ (e) => { setPasswordInput(e.target.value) }}/>
                <br/>
                <label>Confirm Password:</label>
                <input ref={ confirmRef } type="password" name='confirm password' placeholder='Confirm Password' required onChange={ (e) => { setConfirmInput(e.target.value) }}/>
                <br/>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    )
}

export default SignUp;