import {SET_PLACES,REMOVE_PLACE} from './actionType';
import {uiStartLoading,uiStopLoading} from "./ui"
import {authGetToken} from './auth';
import axios from 'axios';
import qs from "qs";

export const addPlace = (placeName, location, image) => {
    return dispatch => {
        let authToken = null;
        dispatch(uiStartLoading());
        dispatch(authGetToken())
            .then(token => {
                authToken= token;
                return fetch("https://us-central1-places-1545241965872.cloudfunctions.net/storeImage", {
                    method: "POST",
                    body: JSON.stringify({
                        image: image.base64
                    }),
                    headers: {
                        Authorization: 'Bearer ' + authToken,
                    }
                });
            })
            .catch(() => {
                alert('No valid token found');
            })

            .then(res => res.json())
            .then(parsedData => {

                    const placeData = {
                        name: placeName,
                        location: location,
                        image: parsedData.imageUrl

                    }

                    return axios.post('https://places-1545241965872.firebaseio.com/places.json?auth='+authToken, JSON.stringify(placeData))
                        .catch(err => {
                            console.log(err);
                            alert('Something went wrong!')
                            dispatch(uiStopLoading());
                        })
                        .then(res => {
                            console.log(res)
                            dispatch(uiStopLoading());
                        });
                }
            ).catch(err => {
            console.log(err);
            alert('Something went wrong!')
            dispatch(uiStopLoading());
        })


    };
};

export const getPlaces = () =>{
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                return  axios.get('https://places-1545241965872.firebaseio.com/places.json?auth='+token)
            })
            .catch(() => {
                alert('No valid token found');
            })
            .then(resp => {
                const places = [];
                for(let key in resp.data){
                    places.push({
                        ...resp.data[key],
                        image:{
                          uri:resp.data[key].image
                        },
                        key:key
                    });
                }
                dispatch(setPlaces(places))
            })
            .catch(err => {
                console.log(err);
                alert('Something went wrong when fetching data')
            }
        )
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(authGetToken())
            .then(token => {
                dispatch(removePlace(key));
                return  axios.delete('https://places-1545241965872.firebaseio.com/places/'+ key + ".json?auth="+token)
            })
            .catch(() => {
                alert('No valid token found');
            })
            .then(res => {
                console.log("Done!");
            })
            .catch(err => {
            alert("Something went wrong, sorry :/");
            console.log(err);
             })
    };
};

export const setPlaces = places =>{
    return {
        type:SET_PLACES,
        places:places
    };
};

export const removePlace = key => {
    return {
        type: REMOVE_PLACE,
        key: key
    };
};


