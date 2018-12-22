import {AUTH_SET_TOKEN,AUTH_REMOVE_TOKEN} from '../actions/actionType';

const initialState = {
    token:null
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case AUTH_SET_TOKEN:
            return{
                ...state,
                token:action.token
            };
            break;
        case AUTH_REMOVE_TOKEN:
            return{
                ...state,
                token:null
            };
            break;
        default:
            return state;
    }
};

export default  reducer;