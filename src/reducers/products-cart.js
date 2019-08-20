
import {
    CURRENT_ADD, 
    CLEAN_PRODUCTS, 
    DELETE_FROM_CART, 
    EDIT_FROM_CART
} from '../constants/product';

export default (state = [], action) =>{
    switch(action.type){
        case CURRENT_ADD:
            return [...state, action.payload ]
        case EDIT_FROM_CART:
            state.splice(action.id, 1, action.product);
            return [...state] 
        case DELETE_FROM_CART:
            state.splice(action.payload, 1)
            return [...state]
        case CLEAN_PRODUCTS:
            return state = [];    
        default: 
            return state;    
    }
}