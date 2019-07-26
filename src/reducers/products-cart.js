
import { CURRENT_ADD, CLEAN_PRODUCTS } from '../constants/product';

export default (state = [], action) =>{
    switch(action.type){
        case CURRENT_ADD:
            return [...state, action.payload ]
        case CLEAN_PRODUCTS:
            return state = [];    
        default: 
            return state;    
    }
}