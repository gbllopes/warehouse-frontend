
import { CURRENT_ADD } from '../constants/product';

export default (state = [], action) =>{
    switch(action.type){
        case CURRENT_ADD:
            return [...state, action.payload ]
        default: 
            return state;    
    }
}