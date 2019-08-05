import { PRODUCT_ADD, PRODUCT_LIST } from '../constants/product';


export default (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_ADD:
            return {...state, status: action.payload };
        case PRODUCT_LIST:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

