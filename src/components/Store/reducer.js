import {
    GET_PHOTOS_FROM_NASA
} from "./constants"

const initialState = {
    photos: []
};

export default function rootReducer(state = initialState, action) {

    switch (action.type) {
        case GET_PHOTOS_FROM_NASA:
            return {
                ...state,
                photos: action.payload
            };

        default:
            return state;
    }
};