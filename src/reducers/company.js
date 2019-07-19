import { ADD_COMPANY } from '../constants/company';

export default (state = {}, action) => {
    switch(action){
        case ADD_COMPANY:
            return {...state, empresa: action.payload};
        default:
            return state;
    }
} 