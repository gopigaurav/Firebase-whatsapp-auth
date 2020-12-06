import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import {auth, provider} from './firebase';
import { useStateValue } from './StateProvider';
import { actionTypes } from './reducer';

function Login() {
    const [{} , dispatch] = useStateValue()
// authentication

    const signIn= () =>{
        auth.signInWithPopup(provider).then((result) => 
            {
                dispatch({
                    type:actionTypes.SET_USER,
                    user:result.user,
                })
            }).catch((error) => alert(error.message))
    }

    return (
        <div className = "login">
            <div className="login__container">
             <img className="login__containerImage"
             src="https://p7.hiclipart.com/preview/922/489/218/whatsapp-icon-logo-whatsapp-logo-png.jpg"
             alt="whatsapp-logo"
             />
            <div className="login__text">
                <h1>Sign in to WhatsApp</h1>
            </div>
            <Button onClick={signIn}>
                Sign in with Google
            </Button>
              </div>
        </div>
    )
}

export default Login
