import {
     PRODUCT_ADD,
     PRODUCT_LIST, 
     DELETE_FROM_STORE,
     PRODUCT_EDIT
    } from '../constants/product';

export default (state = {}, action) =>{
    switch(action.type){
        case PRODUCT_ADD:
            return {...state, status: action.payload };
        case PRODUCT_LIST:
            return {...state, ...action.payload};
        case PRODUCT_EDIT:
               var products =  Object.values(state).map(product => {
                    if (product.idProduto === action.payload.idProduto){
                        product = action.payload
                    } 
                    return product;  
                })    
            return {
               ...state, ...products 
            }  
        case DELETE_FROM_STORE:
            return {
               ...Object.values(state).filter(product => product.idProduto !== action.payload)
           };
        default:
            return state;
    }
}

