import axios from 'axios';

import {
    GET_PHOTOS_FROM_NASA
} from "./constants"

//trae todas las categorias 
export function getPhotosFromApi() {
    return async function (dispatch) {
        return await axios.get('/courses/allcategories/')
            .then(response => {
                dispatch({
                    type: GET_PHOTOS_FROM_NASA,
                    payload: response.data
                })
            })
            .catch(err => { 
                console.error(err)
                return err 
            })
    }
}