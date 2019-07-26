import { PRODUCT_ADD } from '../constants/product';


export default (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_ADD:
            return {...state, status: action.payload };
        default:
            return state;
    }
}

