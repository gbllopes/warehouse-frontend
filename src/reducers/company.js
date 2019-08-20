import { ADD_COMPANY } from '../constants/company';

export default (state = {msg: null}, action) => {
    switch(action){
        case ADD_COMPANY:
            return {...state, msg: action.payload};
        default:
            return state;
    }
} 