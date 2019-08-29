import {
     PRODUCT_ADD,
     PRODUCT_LIST, 
     DELETE_FROM_STORE,
     PRODUCT_EDIT,
     PRODUCT_SEARCH
    } from '../constants/product';

export default (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_ADD:
            return {...state, status: action.payload };
        case PRODUCT_LIST:
            return {...state, ...action.payload};
        case PRODUCT_EDIT:
               var products =  Object.values(state).map(product => {
                    if (product.id_produto === action.payload.id_produto){
                        product = action.payload
                    } 
                    return product;  
                })    
            return {
               ...state, ...products 
            }  
        case PRODUCT_SEARCH:
            return {...action.payload}
        case DELETE_FROM_STORE:
            return {
               ...Object.values(state).filter(product => product.id_produto !== action.payload)
           };
        default:
            return state;
    }
}

