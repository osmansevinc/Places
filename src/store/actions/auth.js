import {TRY_AUTH} from './actionType'

export const tryAuth = (authData) => {

    return {
        type:TRY_AUTH,
        authData:authData
    };

};