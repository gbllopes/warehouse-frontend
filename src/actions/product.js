
import { CURRENT_ADD, PRODUCT_ADD, CLEAN_PRODUCTS } from '../constants/product';
import {rest} from '../authentication/tokenConfig';

export const productsCurrentAdd = (formValues) => dispatch =>{
    dispatch({ type: CURRENT_ADD , payload: formValues });
}

export const produtcsAdd = (form) => async dispatch =>{
    try{
        const response = await rest('').post('/products', form)
        dispatch({ type: PRODUCT_ADD, payload: response.status});
    }catch(e){
        dispatch({ type: PRODUCT_ADD, payload: 500});
    }
    
}

export const cleanProducts = () => dispatch =>{
    dispatch({ type : CLEAN_PRODUCTS})
}
