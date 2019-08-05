
import {    
    CURRENT_ADD, 
    PRODUCT_ADD, 
    CLEAN_PRODUCTS, 
    DELETE_FROM_CART, 
    EDIT_FROM_CART,
    PRODUCT_LIST
} 
from '../constants/product';
import {rest} from '../authentication/tokenConfig';

export const productsCurrentAdd = (formValues) => dispatch =>{
    dispatch({ type: CURRENT_ADD , payload: formValues });
}

export const deleteFromCart = (id) => dispatch =>{
    dispatch({ type: DELETE_FROM_CART, payload: id});
} 

export const editFromCart = (product, id) => dispatch => {
    dispatch({ type: EDIT_FROM_CART, product, id})
}

export const cleanProducts = () => dispatch =>{
    dispatch({ type : CLEAN_PRODUCTS})
}

export const produtcsAdd = (form) => async dispatch =>{
    try{
        const response = await rest('').post('/products', form);
        dispatch({ type: PRODUCT_ADD, payload: response.status});
    }catch(e){
        dispatch({ type: PRODUCT_ADD, payload: 500});
    }
    
}

export const productList = (idCompany) => async dispatch => {
    try{
        const response = await rest('').get(`/products/company/${idCompany}`);
        dispatch({ type : PRODUCT_LIST, payload: response.data});
    }catch(e){
        
    }
}

export const productDelete = async (id) =>{
    try{
        await rest('').delete(`/xpto/${id}`);
    }catch(e){

    }
}

export const productEdit = async (id, product) =>{
    try{
        await rest('').patch(`/xpto/${id}`, ...product);
    }catch(e){

    }
} 

