import {TRY_AUTH, AUTH_SET_TOKEN} from './actionType'
import axios from 'axios';
import{uiStartLoading,uiStopLoading} from './ui'

import startMainTabs from '../../screens/MainTabs/startMainTabs';

export const tryAuth = (authData,authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
        const apiKey = 'AIzaSyAIgB6sCFoylKtcK0Ksqat2JkPuaVZNOuU';
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' + apiKey;
        if(authMode !== 'login'){
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' + apiKey;
        }
        axios.request({
            url: url,
            method: "post",
            data:{
                email:authData.email,
                password:authData.password,
                returnSecureToken:true
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept-Type': 'application/json'
            }
        })
            .then(user => authSuccess(dispatch, user))
            .catch((e) =>{
                console.log('Something went wrong when signup user : ' + e);
                dispatch(uiStopLoading());
                alert('Whoops ' + e);
            });
    };
};

const authSuccess = (dispatch, user) => {
    if(!user.data && !user.data.idToken){
        alert('Something went wrong when signup user!, Error: '+user.message );
    }else{
        dispatch(uiStopLoading());
        startMainTabs();
        console.log(user.data)
        console.log(user.data.idToken)
        dispatch(authSetToken(user.data.idToken));
    }
};

export const authSetToken = (token)  =>{
    return {
        type:AUTH_SET_TOKEN,
        token:token
    }
};

export const authGetToken = () =>{
    return (dispatch,getState) => {
        const promise = new Promise( (resolve,reject) => {
            const token = getState().auth.token;
            if(!token){
                reject();
            }else{
                resolve(token);
            }
        });
        return promise;
    }
};

