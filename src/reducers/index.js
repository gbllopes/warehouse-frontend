import {combineReducers} from 'redux';
import data from './data';
import {reducer as formReducer} from 'redux-form';
import login from './login';
import productsCart from './products-cart';
import products from './products'
import company from './company';
import {reducer as toastrReducer} from 'react-redux-toastr'


export default combineReducers({
  isAutenticado: login,
  loaded: data,
  form: formReducer,
  productsCart: productsCart,
  products:products,
  company: company,
  toastr: toastrReducer
})
