import {TRY_AUTH, AUTH_SET_TOKEN,AUTH_REMOVE_TOKEN} from './actionType'
import {AsyncStorage} from 'react-native';
import axios from 'axios';
import querystring from 'qs';
import{uiStartLoading,uiStopLoading} from './ui';
import App from '../../../App';

import startMainTabs from '../../screens/MainTabs/startMainTabs';

const apiKey = 'AIzaSyAIgB6sCFoylKtcK0Ksqat2JkPuaVZNOuU';

export const tryAuth = (authData,authMode) => {
    return dispatch => {
        dispatch(uiStartLoading());
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
        dispatch(authStoreToken(user.data.idToken,user.data.expiresIn,user.data.refreshToken));
        startMainTabs();
    }
};

export const authStoreToken = (token,expiresIn,refreshToken) =>{
    return dispatch => {
        dispatch(authSetToken(token));
        const now = new Date();
        const expiryDate = now.getTime() + 20 * 1000;
        AsyncStorage.setItem('api:auth:token',token);
        AsyncStorage.setItem('api:auth:expiryDate',expiryDate.toString());
        AsyncStorage.setItem('api:auth:refreshToken',refreshToken);
    }
}

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
                let fetchedToken;
               AsyncStorage.getItem('api:auth:token')
                   .catch(err=> reject())
                   .then(tokenFromStore => {
                       fetchedToken = tokenFromStore;
                       if(!tokenFromStore){
                           reject();
                           return;
                       }
                       return AsyncStorage.getItem('api:auth:expiryDate');
                   })
                   .then(expiryDate =>{
                       if(!expiryDate){
                           reject();
                           return;
                       }
                       const parsedExpiryDate = new Date(parseInt(expiryDate));
                       if(parsedExpiryDate > new Date()){
                           dispatch(authSetToken(fetchedToken));
                           resolve(fetchedToken);
                       }else{
                           reject();
                           return;
                       }

                   })
                   .catch(err => reject())
            }else{
                resolve(token);
            }
        });
       return promise
           .catch(err => {
              return AsyncStorage.getItem('api:auth:refreshToken')
                .then(refreshToken => {

                    const requestBody = querystring.stringify({
                        'grant_type': 'refresh_token',
                        'refresh_token': refreshToken
                    })

                    const config = {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }
                   return  axios.post('https://securetoken.googleapis.com/v1/token?key='+apiKey,
                       requestBody,config)

                })
                .then(res => {
                    if(res.data.id_token){
                        console.log('refresh_token worked!')
                        dispatch(authStoreToken(res.data.id_token,res.data.expires_in,res.data.refresh_token));
                        return res.data.id_token;
                    }
                })
                .catch(err => {
                    dispatch(authClearStorage());
                })
          })
           .then(token => {
               if(!token){
                   throw (new Error());
               }else {
                   return token;
               }
           })
    }
};

export const authAutoSignIn = () =>{
    return dispatch =>{
        dispatch(authGetToken())
            .then(token => {
                startMainTabs();
            })
            .catch(err=> console.log('Fetch token failed!'))
    }
};

export const authClearStorage = () => {
    return dispatch=>{
        AsyncStorage.removeItem('api:auth:token');
        AsyncStorage.removeItem('api:auth:expiryDate');
        return AsyncStorage.removeItem('api:auth:refreshToken');
    };

};

export const authLogout = () => {
    return dispatch=>{
        dispatch(authClearStorage())
            .then(() => {
                App();
            })
        dispatch(authRemoveToken());
    };
};

export const authRemoveToken = () => {
    return{
            type:AUTH_REMOVE_TOKEN
    };
};

