import {SET_PLACES,REMOVE_PLACE} from './actionType';
import {uiStartLoading,uiStopLoading} from "./ui"
import axios from 'axios';
import qs from "qs";

export const addPlace = (placeName, location, image) =>{
    return dispatch => {
        dispatch(uiStartLoading());
        fetch("https://us-central1-places-1545241965872.cloudfunctions.net/storeImage", {
            method: "POST",
            body: JSON.stringify({
                image: image.base64
            })
        }) .catch(err => {
            console.log(err);
            alert('Something went wrong!')
            dispatch(uiStopLoading());
        })
            .then(res =>res.json())
            .then(parsedData => {

                    const placeData = {
                        name:placeName,
                        location:location,
                        image:parsedData.imageUrl

                    }

                   return axios.post('https://places-1545241965872.firebaseio.com/places.json', JSON.stringify(placeData))
                       .catch(err => {
                           console.log(err);
                           alert('Something went wrong!')
                           dispatch(uiStopLoading());
                       })
                        .then(res =>{
                            console.log(res)
                            dispatch(uiStopLoading());
                        });
                }
                )


};
};

export const getPlaces = () =>{
    return dispatch => {
        axios.get('https://places-1545241965872.firebaseio.com/places.json')
            .catch(err => {
                    console.log(err);
                    alert('Something went wrong when fetching data')
                }
            )
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
    }
}

export const deletePlace = (key) => {
    return dispatch => {
        dispatch(removePlace(key));
        axios.delete('https://places-1545241965872.firebaseio.com/places/'+ key + ".json")
            .catch(err => {
                alert("Something went wrong, sorry :/");
                console.log(err);
            })
            .then(res => {
                console.log("Done!");
            });
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


